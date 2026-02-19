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
            added_by: category.added_by || '',
            added_at: category.added_at || new Date(),
            updated_by: category.updated_by || '',
            updated_at: category.updated_at || new Date()

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
            updated_at: new Date()
        };
    }
}