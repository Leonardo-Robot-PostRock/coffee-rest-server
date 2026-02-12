import { Schema } from "mongoose";

export interface ICategory {
    name: string;
    state: boolean;
    addedBy: Schema.Types.ObjectId;
    added_at: Date;
    updatedBy: Schema.Types.ObjectId;
    updated_at: Date;

}