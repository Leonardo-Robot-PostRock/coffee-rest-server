import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    img?: string;
    role: string;
    state: boolean;
    google: boolean;
}