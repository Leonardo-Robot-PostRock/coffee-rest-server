import { Request, Response } from "express"
import Category from "../models/category";


const createCategory = async (req: Request, res: Response) => {
    // Convert the name category to uppercase
    const name = req.body.name.toUpperCase();

    console.log("name: ",name);
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
        user: req.user._id
    }

    // Create a new category instance
    const category = new Category(data);

    // Save the category to the database
    await category.save();

    // Return the category in the response
    res.status(201).json(category);
}

export {
    createCategory
}