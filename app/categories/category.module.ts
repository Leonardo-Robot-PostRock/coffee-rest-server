// Repository (Data Access Layer - infrastructure)
import { MongooseCategoryRepository } from "../infrastructure/persistence/mongoose/category/repository/mongo-category.repository";

// Application Service Layer
import { CategoryService } from "./services/category.service";

// Presentation
import { buildCategoryController } from "./presentation/api/category.controller";

// Module Assembler
const categoryRepository = new MongooseCategoryRepository();
const categoryService = new CategoryService(categoryRepository);

// Controller already built with the service
export const categoryController = buildCategoryController(categoryService);