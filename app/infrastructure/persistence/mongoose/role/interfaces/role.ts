import { HydratedDocument, Schema } from "mongoose";

export interface MongoRole {
    _id: Schema.Types.ObjectId;
    roleName: string;
    state: boolean;
    addedBy: Schema.Types.ObjectId;
    addedAt: Date;
    updatedBy: Schema.Types.ObjectId;
    updatedAt: Date;
}

export type MongoRoleDocument = HydratedDocument<MongoRole>;