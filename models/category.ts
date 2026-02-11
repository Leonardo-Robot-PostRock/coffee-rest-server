import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/category";

const CategorySchema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
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

CategorySchema.methods.toJSON = function () {
    const { __v, state, _id, ...category } = this.toObject();

    category.uid = _id;
    
    if (category.addedBy && typeof category.addedBy === 'object' && '_id' in category.addedBy) {
        category.addedBy.uid = category.addedBy._id;
        delete category.addedBy._id;
    }

    if (category.updatedBy && typeof category.updatedBy === 'object' && '_id' in category.updatedBy) {
        category.updatedBy.uid = category.updatedBy._id;
        delete category.updatedBy._id;
    }

    return category;
}

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;