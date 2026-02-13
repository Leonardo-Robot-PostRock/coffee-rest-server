import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product";

const ProductSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    description: {
        type: String,
        required: [true, 'Description is mandatory']
    },
    available: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    added_at: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

})

ProductSchema.methods.toJSON = function () {
    const { __v, state, _id, ...product } = this.toObject();

    product.uid = _id;
    return product;
}

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;