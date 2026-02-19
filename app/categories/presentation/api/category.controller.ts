import { Request, Response } from "express";

// Services
import { CategoryService } from "../../services/category.service";

export const buildCategoryController = (categoryService: CategoryService) => ({
    getCategories: async (req: Request, res: Response) => {
        const { limit = 5, from = 0 } = req.query;

        const result = await categoryService.getCategoriesService({
            limit: Number(limit),
            from: Number(from)
        });

        res.status(200).json(result);
    },

    getCategoryById: async (req: Request, res: Response) => {
        const { id } = req.params;

        const category = await categoryService.getCategoryByIdService(id);

        res.status(200).json(category);
    },

    createCategory: async (req: Request, res: Response) => {

        const name = req.body.name.toUpperCase();
        const addedBy = req.user!.uid;

        const categoryDB = await categoryService.createCategoryService(name, addedBy);

        res.status(201).json({ category: categoryDB });
    },

    updateCategory: async (req: Request, res: Response) => {
        const { id } = req.params;

        const { state, user, ...data } = req.body;

        const updatedBy = req.user!.uid;

        const category = await categoryService.updateCategoryService(id, data, updatedBy);

        res.status(200).json({ category });        
    },

    deleteCategory: async (req: Request, res: Response) => {
        const { id } = req.params;

        const category = await categoryService.deleteCategoryService(id);

        res.status(200).json({ category });
    }
});
