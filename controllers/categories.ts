import { Request, Response } from "express"
import Category from "../models/category";
import path from 'path';


const createCategory = async (req: Request, res: Response) => {
    // Convert the name category to uppercase
    const name = req.body.name.toUpperCase();

    // Check if the category already exists in the database
    const categoryDB = await Category.findOne({ name });

    // If the category already exists, return an error
    if (categoryDB) {
        res.status(400).json({
            msg: `La categoría ${categoryDB.name} ya existe`
        });
    }

    // Generate the data to save
    const data = {
        name,
        addedBy: req.user._id
    }

    // Create a new category instance
    const category = new Category(data);

    // Save the category to the database
    await category.save();

    // Return the category in the response
    res.status(201).json(category);
}

// getCategories - paginated - total - populate
const getCategories = async (req: Request, res: Response) => {
    const { limit = 5, from = 0 } = req.query;

    // Only get categories with state true
    const query = { state: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('addedBy', 'name email')
    ]);

    res.json({
        total,
        categories
    });
}

// getCategoryById - populate {}
const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Category.findById(id).populate('addedBy', 'name email');

    if (!category) {
        res.status(404).json({
            msg: `No existe la categoría con id ${id}`
        });
    }

    res.json(category);
}

// updateCategory - name to uppercase - populate {}
const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    const name = req.body.name.toUpperCase();

    // Verificar si ya existe otra categoría con el mismo nombre
    const categoryDB = await Category.findOne({ name, _id: { $ne: id } });

    if (categoryDB) {
        res.status(400).json({
            msg: `La categoría ${categoryDB.name} ya existe`
        });
    }

    // Generate the data to update
    const data = {
        name,
        modify_backlog: {
            updatedBy: req.user._id,
            updated_at: new Date()
        }
    };

    // Update the category in the database
    const category = await Category.findByIdAndUpdate(id, data, { new: true })
        .populate('addedBy', 'name email')
        .populate('modify_backlog.updatedBy', 'name email');

    res.json(category);
}

// deleteCategory - state to false
const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    const state = false;

    // Update the category's state to false in the database
    const categoryDB = await Category.findByIdAndUpdate(id, { state }, { new: true })
        .populate('addedBy', 'name email')
        .populate('modify_backlog.updatedBy', 'name email');

    res.json(categoryDB);
}

export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}     