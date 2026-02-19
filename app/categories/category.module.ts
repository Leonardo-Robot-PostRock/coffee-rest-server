// Category Service Layer
import { CategoryService } from "./services/category.service";

// Presentation
import { buildCategoryController } from "./presentation/api/category.controller";
import { MongooseCategoryRepository } from "../infrastructure/persistence/mongoose/category/repository/mongo-category.repository";

const categoryRepository = new MongooseCategoryRepository();

// Module Composition
const categoryService = new CategoryService(categoryRepository);

// Controller already built with the service
export const categoryController = buildCategoryController(categoryService);