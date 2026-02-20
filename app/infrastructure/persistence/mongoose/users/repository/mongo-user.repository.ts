
// Implementación concreta del UserRepository usando Mongoose
import { IUserRepository } from "../../../../../users/domain/repositories/user.repository";
import { IUser } from "../../../../../users/domain/interfaces/user";

// Mappers
import { userFromMongoToDomain } from "../mappers/user-mongo.mapper";

// Mongoose User model
import { User } from "../models/user.model";


export class MongooseUserRepository implements IUserRepository {

  async findById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user ? userFromMongoToDomain(user) : null;
  }

  async findActive(limit: number, from: number) {
    const query = { state: true };

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(from).limit(limit),
    ]);

    return { total, users: users.map(userFromMongoToDomain) };
  }

  async create(data: Pick<IUser, 'name' | 'email' | 'password' | 'role'>): Promise<IUser> {
    const user = new User(data);
    await user.save();
    return userFromMongoToDomain(user);
  }

  async updateById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return updatedUser ? userFromMongoToDomain(updatedUser) : null;
  }

  async deleteById(id: string): Promise<IUser | null> {
    const deletedUser = await User.findByIdAndUpdate(id, { state: false }, { new: true });
    return deletedUser ? userFromMongoToDomain(deletedUser) : null;
  }
}
