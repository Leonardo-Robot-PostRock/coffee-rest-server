import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/category";

const categorySchema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;