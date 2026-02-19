// Mapper
import { CategoryMapper } from "./category.mapper";

// Repository
import { ICategoryRepository } from "../domain/repositories/category.repository";

// DTOs
import { IUpdateCategoryDTO, IResponseCategoryDTO } from "../dto";

export class CategoryService {
    constructor(
        private readonly categoryRepository: ICategoryRepository
    ) { }

    async getCategoriesService({ limit = 5, from = 0 }: { limit?: number; from?: number }): Promise<{ total: number; categories: IResponseCategoryDTO[] }> {
        const { total, categories } = await this.categoryRepository.findActive(limit, from);

        return {
            total,
            categories: categories.map(CategoryMapper.toResponseDTO)
        };
    }

    async getCategoryByIdService(id: string): Promise<IResponseCategoryDTO | null> {
        const category = await this.categoryRepository.findById(id);

        return category ? CategoryMapper.toResponseDTO(category) : null;
    }

    async createCategoryService(name: string, addedBy: string): Promise<IResponseCategoryDTO> {

        const nameUpper = name.toUpperCase();

        const categoryDB = await this.categoryRepository.findByName(nameUpper);

        if (categoryDB) {
            throw new Error(`La categoría ${nameUpper} ya existe`);
        }

        const data = {
            name: nameUpper,
            addedBy,
        }

        const category = await this.categoryRepository.create(data.name, data.addedBy);

        return CategoryMapper.toResponseDTO(category);
    }

    async updateCategoryService(
        id: string,
        data: IUpdateCategoryDTO,
        updatedBy: string
    ): Promise<IResponseCategoryDTO | null> {

        const { name, ...rest } = data;

        const payload: Partial<IUpdateCategoryDTO> = { ...rest };

        if (name) {
            payload.name = name.toUpperCase();
        }

        payload.updatedBy = updatedBy;
        payload.updated_at = new Date();

        const updatedCategory = await this.categoryRepository.updateById(id, payload);

        return  updatedCategory ? CategoryMapper.toResponseDTO(updatedCategory) : null;
    }

    async deleteCategoryService(id: string): Promise<IResponseCategoryDTO | null> {

        const deletedCategory = await this.categoryRepository.deleteById(id);

        return deletedCategory ? CategoryMapper.toResponseDTO(deletedCategory) : null;
    }
}