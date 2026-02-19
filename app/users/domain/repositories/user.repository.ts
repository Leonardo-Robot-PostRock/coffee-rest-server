import { IUser } from "../interfaces/user";

export interface IUserRepository {
    findById(id: string): Promise<IUser | null>;
    findActive(limit: number, from: number): Promise<{ total: number; users: IUser[] }>;
    create(data: Partial<IUser>): Promise<IUser>;
    updateById(id: string, data: Partial<IUser>): Promise<IUser | null>;
    deleteById(id: string): Promise<IUser | null>;
}