import { Schema } from "mongoose";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    state: boolean;
    available: boolean;
    added_at: Date;
    updated_at: Date;
    addedBy: Schema.Types.ObjectId;
    updatedBy: Schema.Types.ObjectId;
    categoria: Schema.Types.ObjectId;
}