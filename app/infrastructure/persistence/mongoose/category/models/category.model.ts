import mongoose, { Schema } from "mongoose";
import { MongoCategory } from "../interfaces/category";

const CategorySchema = new mongoose.Schema<MongoCategory>({
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
    addedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

// Create a unique index on the name field with case-insensitive collation 
// This ensures that category names are unique regardless of their case (e.g., "POSTRES" and "postres" would be considered the same)
CategorySchema.index({ name: 1 }, { unique: true, collation: { locale: 'es', strength: 2 } });

export const Category = mongoose.model<MongoCategory>('Category', CategorySchema);