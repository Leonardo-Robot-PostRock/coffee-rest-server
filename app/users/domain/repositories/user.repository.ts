import { IUser } from "../interfaces/user";

export interface IUserRepository {
    findById(id: string): Promise<IUser | null>;
    findActive(limit: number, from: number): Promise<{ total: number; users: IUser[] }>;
    create(data: any): Promise<IUser>;
    updateById(id: string, data: any): Promise<IUser | null>;
    deleteById(id: string): Promise<IUser | null>;
}