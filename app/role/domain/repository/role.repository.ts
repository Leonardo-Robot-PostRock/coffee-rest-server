import { IRole } from "../interfaces/role";

export interface IRoleRepository {
    create(name: string, addedBy: string): Promise<IRole>;
    findById(id: string): Promise<IRole | null>;
    findByName(name: string): Promise<IRole | null>;
    findActive(): Promise<IRole[]>;
    updateById(id: string, data: Partial<IRole>): Promise<IRole | null>;
    deleteById(id: string): Promise<IRole | null>;
}