import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products";

const router = Router();

// get all products
router.get('/', [

],
    getProducts
);

// get product by id
router.get('/:id', [

],
    getProductById
);

// create product
router.post('/', [

],
    createProduct
);

// update product
router.put('/:id', [

],
    updateProduct
);


// delete product
router.delete('/:id', [

],
    deleteProduct
);

export default router;