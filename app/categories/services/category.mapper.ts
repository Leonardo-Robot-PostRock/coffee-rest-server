// Interfaces
import { ICategory } from "../domain/interfaces/category";

// DTOs
import { ICreateCategoryDTO, IResponseCategoryDTO, IUpdateCategoryDTO } from "../dto";

export class CategoryMapper {
    static toResponseDTO(category: ICategory): IResponseCategoryDTO {
        return {
            uid: category.uid,
            name: category.name,
            state: category.state,
            addedBy: category.addedBy || '',
            addedAt: category.addedAt || new Date(),
            updatedBy: category.updatedBy || '',
            updatedAt: category.updatedAt || new Date()

        };
    }

    static toCreateCategoryDTO(category: any): ICreateCategoryDTO {
        return {
            name: category.name
        };
    }

    static toUpdateCategoryDTO(category: any): IUpdateCategoryDTO {
        return {
            name: category.name,
            state: category.state,
            updatedBy: category.updatedBy,
            updatedAt: new Date()
        };
    }
}