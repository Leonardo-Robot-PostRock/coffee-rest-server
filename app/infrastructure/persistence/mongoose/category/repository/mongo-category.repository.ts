// Domain interface
import { ICategory } from "../../../../../categories/domain/interfaces/category";

// Repository interface
import { ICategoryRepository } from "../../../../../categories/domain/repositories/category.repository";

// Domain errors
import { DuplicateCategoryError, CategoryNotFoundError } from '../../../../../categories/domain/errors';

// Mapper
import { categoryFromMongoToDomain } from "../mappers/category-mongoose.mapper";

// Concrete implementation of the CategoryRepository using Mongoose
import { Category } from "../models/category.model";
import { MongoServerError } from "mongodb";

/**
 * Implementation of the ICategoryRepository interface using Mongoose for MongoDB interactions.
 * This class provides methods to create, read, update, and delete category documents in the MongoDB database.
 * It also includes methods to find categories by name and to retrieve active categories with pagination support.
 */
export class MongooseCategoryRepository implements ICategoryRepository {

    async create(name: string, addedBy: string): Promise<ICategory> {
        try {
            const category = new Category({ name, addedBy });
            await category.save();

            return categoryFromMongoToDomain(category);
        } catch (error: any) {
            if (error instanceof MongoServerError && error.code === 11000) {
                // índice único de name violado
                throw new DuplicateCategoryError(name);
            }
            throw error;
        }
    }

    async findById(id: string): Promise<ICategory | null> {
        const category = await Category.findById(id).populate('addedBy', 'name email');

        return category ? categoryFromMongoToDomain(category) : null;
    }

    async findByName(name: string): Promise<ICategory | null> {
        const category = await Category.findOne({ name });

        return category ? categoryFromMongoToDomain(category) : null;
    }

    async findActive(limit: number, from: number): Promise<{ total: number; categories: ICategory[] }> {
        const query = { state: true };
        const [total, categories] = await Promise.all([

            Category.countDocuments(query),
            Category.find(query)
                .skip(from)
                .limit(limit)
                .populate('addedBy', 'name email')
        ]);

        return { total, categories: categories.map(categoryFromMongoToDomain) };
    }

    async updateById(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
        try {
            const category = await Category.findByIdAndUpdate(id, data, { new: true })
                .populate('addedBy', 'name email')
                .populate('updatedBy', 'name email');

            if (!category) {
                throw new CategoryNotFoundError(id);
            }

            return categoryFromMongoToDomain(category);
        } catch (error: any) {
            if (error instanceof MongoServerError && error.code === 11000 && data.name) {
                throw new DuplicateCategoryError(String(data.name));
            }
            throw error;
        }
    }

    async deleteById(id: string): Promise<ICategory | null> {
        const state = false;

        const category = await Category.findByIdAndUpdate(id, { state }, { new: true })
            .populate('addedBy', 'name email')
            .populate('updatedBy', 'name email');

        if (!category) {
            throw new CategoryNotFoundError(id);
        }

        return categoryFromMongoToDomain(category);
    }
}