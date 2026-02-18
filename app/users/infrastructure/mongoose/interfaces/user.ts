import { HydratedDocument, Schema } from 'mongoose';

// Define the MongoDB user interface
export interface MongoUser {
    name: string;
    email: string;
    password: string;
    img?: string;
    role: string;
    state: boolean;
    google: boolean;
    created_at: Date;
    updated_at: Date;
}

// Define the Mongoose schema for the user
export type MongoUserDocument = HydratedDocument<MongoUser>;