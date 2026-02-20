import { HydratedDocument, Schema } from 'mongoose';

// Define the MongoDB user interface
export interface MongoUser {
    name: string;
    email: string;
    password: string;
    img?: string;
    role: Schema.Types.ObjectId;
    state: boolean;
    google: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Mongoose schema for the user
export type MongoUserDocument = HydratedDocument<MongoUser>;