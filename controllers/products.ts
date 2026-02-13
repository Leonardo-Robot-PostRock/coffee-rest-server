import { Request, Response } from "express"

const getProducts = async (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'get API - controller'
    })
}

const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    res.status(200).json({
        msg: 'get API - controller',
        id
    })
}

const createProduct = async (req: Request, res: Response) => {
    res.status(201).json({
        msg: 'post API - controller'
    })
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