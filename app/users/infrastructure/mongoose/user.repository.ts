import User from "./user";

// Implementación concreta del UserRepository usando Mongoose
import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUser } from "../../domain/interfaces/user";
import { MongoUserDocument } from "./interfaces/user";

const toDomain = (doc: MongoUserDocument): IUser => ({
  uid: doc._id.toString(),
  name: doc.name,
  email: doc.email,
  password: doc.password,
  img: doc.img,
  role: doc.role,
  state: doc.state,
  google: doc.google,
  created_at: doc.created_at,
  updated_at: doc.updated_at,
})

export class MongooseUserRepository implements IUserRepository {

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findActive(limit: number, from: number) {
    const query = { state: true };

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(from).limit(limit),
    ]);

    return { total, users: users.map(toDomain) };
  }

  async create(data: Pick<IUser, 'name' | 'email' | 'password' | 'role'>): Promise<IUser> {
    const user = new User(data);
    await user.save();
    return toDomain(user);
  }

  async updateById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return updatedUser ? toDomain(updatedUser) : null;
  }

  async deleteById(id: string): Promise<IUser | null> {
    const deletedUser = await User.findByIdAndUpdate(id, { state: false }, { new: true });
    return deletedUser ? toDomain(deletedUser) : null;
  }
}
