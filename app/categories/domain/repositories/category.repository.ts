import { ICategory } from "../interfaces/category";

export interface ICategoryRepository {
    create(name: string, addedBy: string): Promise<ICategory>;
    findById(id: string): Promise<ICategory | null>;
    findByName(name: string): Promise<ICategory | null>;
    findActive(limit: number, from: number): Promise<{ total: number; categories: ICategory[] }>;
    updateById(id: string, data: Partial<ICategory>): Promise<ICategory | null>;
    deleteById(id: string): Promise<ICategory | null>;
}