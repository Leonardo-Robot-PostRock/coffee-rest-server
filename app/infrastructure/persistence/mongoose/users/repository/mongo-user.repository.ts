
// Implementación concreta del UserRepository usando Mongoose
import { IUserFinder, IUserRepository } from "../../../../../users/domain/repositories/user.repository";
import { IUser } from "../../../../../users/domain/interfaces/user";

// Mappers
import { userFromMongoToDomain } from "../mappers/user-mongo.mapper";

// Mongoose User model
import { User } from "../models/user.model";

// Handle duplicate errors
import { handleDuplicateError } from "../../../../../shared/handle-duplicate-error";

// Domain errors
import { DuplicateUserError } from "../../../../../users/domain/errors";

// HTTP error
import { HttpError } from "../../../../../shared/http-error";


export class MongooseUserRepository implements IUserRepository, IUserFinder {

  async findById(id: string): Promise<IUser | null> {
    const user = await User.findById(id).populate('role', 'roleName');
    return user ? userFromMongoToDomain(user) : null;
  }

  async findActive(limit: number, from: number) {
    const query = { state: true };

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).populate('role', 'roleName').skip(from).limit(limit),
    ]);

    return { total, users: users.map(userFromMongoToDomain) };
  }

  async create(data: Pick<IUser, 'name' | 'email' | 'password' | 'role'>): Promise<IUser> {
    try {
      const user = new User(data);
      await user.save();
      const populatedUser = await User.findById(user._id).populate('role', 'roleName');

      if (!populatedUser) {
        throw new HttpError(500, 'Falló la creación del usuario');
      }
      return userFromMongoToDomain(populatedUser);
    } catch (error: any) {
      handleDuplicateError(error, data.email, DuplicateUserError);
    }
  }

  async updateById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }).populate('role', 'roleName');
      return updatedUser ? userFromMongoToDomain(updatedUser) : null;
    } catch (error: any) {
      handleDuplicateError(error, String(data.email), DuplicateUserError);
    }
  }

  async deleteById(id: string): Promise<IUser | null> {
    const deletedUser = await User.findByIdAndUpdate(id, { state: false }, { new: true }).populate('role', 'roleName');
    return deletedUser ? userFromMongoToDomain(deletedUser) : null;
  }
}
