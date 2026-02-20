import { HydratedDocument, Schema } from "mongoose";

export interface MongoRole {
    roleName: string;
    state: boolean;
    addedBy: Schema.Types.ObjectId;
    addedAt: Date;
    updatedBy: Schema.Types.ObjectId;
    updatedAt: Date;
}

export type MongoRoleDocument = HydratedDocument<MongoRole>;