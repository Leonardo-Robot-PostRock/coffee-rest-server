import { HydratedDocument, Schema } from "mongoose";

export interface MongoCategory {
    uid: string;
    name: string;
    state: boolean;
    addedBy: Schema.Types.ObjectId;
    added_at: Date;
    updatedBy: Schema.Types.ObjectId;
    updated_at: Date;

}

export type MongoCategoryDocument = HydratedDocument<MongoCategory>;