import { Schema } from "mongoose";

export interface ICategory {
    name: string;
    state: boolean;
    user: Schema.Types.ObjectId;
}