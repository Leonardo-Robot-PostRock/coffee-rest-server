import { HydratedDocument, Schema } from "mongoose";

export interface MongoCategory {
    _id: Schema.Types.ObjectId;
    name: string;
    state: boolean;
    addedBy: Schema.Types.ObjectId;
    addedAt: Date;
    updatedBy: Schema.Types.ObjectId;
    updatedAt: Date;

}

export type MongoCategoryDocument = HydratedDocument<MongoCategory>;