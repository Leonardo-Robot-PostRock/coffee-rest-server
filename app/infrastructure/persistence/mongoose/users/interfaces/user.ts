import { HydratedDocument, Schema } from 'mongoose';

// Define MongoDB Role interface for populated role
export interface MongoRole {
    _id: Schema.Types.ObjectId;
    roleName: string;
}

// Define the MongoDB user interface
export interface MongoUser {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    img?: string;
    role: Schema.Types.ObjectId | MongoRole;
    state: boolean;
    google: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Mongoose schema for the user
export type MongoUserDocument = HydratedDocument<MongoUser>;