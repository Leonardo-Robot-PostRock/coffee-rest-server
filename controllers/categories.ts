import { Request, Response } from "express"
import Category from "../models/category";

const createCategory = async (req: Request, res: Response) => {
    // Convert the name category to uppercase
    const name = req.body.name.toUpperCase();

    // Check if the category already exists in the database
    const categoryDB = await Category.findOne({ name });

    // If the category already exists, return an error
    if (categoryDB) {
        res.status(409).json({
            msg: `La categoría ${categoryDB.name} ya existe`
        });
        return;
    }

    // Generate the data to save
    const data = {
        name,
        addedBy: req.user!._id
    }

    // Create a new category instance
    const category = new Category(data);

    // Save the category to the database with duplicate-key handling
    try {
        await category.save();
        res.status(201).json(category);
    } catch (err: any) {
        if (err && err.code === 11000) {
            res.status(409).json({ msg: `La categoría ${name} ya existe` });
            return;
        }
        throw err;
    }
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

    res.status(200).json({
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
        return;
    }

    res.status(200).json(category);
}

// updateCategory - name to uppercase - populate {}
const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    // Avoid updating the state and user fields
    const { state, user, ...data } = req.body;

    const name = req.body.name.toUpperCase();

    // Verificar si ya existe otra categoría con el mismo nombre
    const categoryDB = await Category.findOne({ name, _id: { $ne: id } });

    if (categoryDB) {
        res.status(409).json({
            msg: `La categoría ${categoryDB.name} ya existe`
        });
        return;
    }

    // Generate the data to update
    data.name = name;
    data.updatedBy = req.user!._id;
    data.updated_at = new Date();

    // Update the category in the database
    try {
        const category = await Category.findByIdAndUpdate(id, data, { new: true })
            .populate('addedBy', 'name email')
            .populate('updatedBy', 'name email');

        res.status(200).json(category);
    } catch (err: any) {
        if (err && err.code === 11000) {
            res.status(409).json({ msg: `La categoría ${data.name} ya existe` });
            return;
        }
        throw err;
    }
}

// deleteCategory - state to false
const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    const state = false;

    // Update the category's state to false in the database
    const categoryDB = await Category.findByIdAndUpdate(id, { state }, { new: true })
        .populate('addedBy', 'name email')
        .populate('updatedBy', 'name email');

    res.status(200).json(categoryDB);
}

export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}     