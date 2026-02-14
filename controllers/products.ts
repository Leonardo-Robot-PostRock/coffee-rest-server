import { Request, Response } from "express"
import Product from "../models/product";
import Category from "../models/category";
import { Types } from 'mongoose';

const getProducts = async (req: Request, res: Response) => {
    const { limit = 5, from = 0, category, categoria } = req.query;

    const query: any = { state: true };

    // Accept either `category` or `categoria` as query param and filter by model field `categoria`
    const catId = category || categoria;
    if (catId) {
        // If catId is an ObjectId use it, otherwise try to find category by name
        if (Types.ObjectId.isValid(String(catId))) {
            query.categoria = String(catId);
        } else {
            const catName = String(catId).toUpperCase();
            const cat = await Category.findOne({ name: catName, state: true });
            if (!cat) {
                // no category matches the provided name -> return empty result
                res.status(200).json({ total: 0, products: [] });
                return;
            }
            query.categoria = cat._id;
        }
    }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('addedBy', 'name email')
            .populate('categoria', 'name')
    ])

    res.status(200).json({
        total,
        products
    });
}

const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findById(id)
        .populate('addedBy', 'name email')
        .populate('categoria', 'name');

    if (!product) {
        res.status(404).json({
            msg: `No existe el producto con id ${id}`
        })
        return;
    }

    res.status(200).json(product);
}

const createProduct = async (req: Request, res: Response) => {
    const { name, description, price = 0, category } = req.body;

    if (!name || !description || !category) {
        res.status(400).json({ msg: 'Name, description y category son requeridos' });
        return;
    }

    const nameUpper = name.toUpperCase();

    // Check if product already exists
    const existingProduct = await Product.findOne({ name: nameUpper });
    if (existingProduct) {
        res.status(409).json({ msg: `El producto ${existingProduct.name} ya existe` });
        return;
    }

    // Accept category as name
    let categoryDB = null;

    const catName = String(category).toUpperCase();
    categoryDB = await Category.findOne({ name: catName, state: true });


    if (!categoryDB || !categoryDB.state) {
        res.status(400).json({ msg: `Categoría inválida: ${category}` });
        return;
    }

    const data = {
        name: nameUpper,
        description,
        price,
        categoria: categoryDB._id,
        addedBy: req.user!._id
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json(product);
}

const updateProduct = async (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'put API - controller'
    })
}

const deleteProduct = async (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'delete API - controller'
    })
}


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}