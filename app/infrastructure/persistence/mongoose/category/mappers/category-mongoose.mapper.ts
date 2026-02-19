import { ICategory } from "../../../../../categories/domain/interfaces/category";
import { MongoCategoryDocument } from "../interfaces/category";

export const categoryFromMongoToDomain = (doc: MongoCategoryDocument): ICategory => ({
    uid: doc._id.toString(),
    name: doc.name,
    state: doc.state,
    added_by: doc.addedBy.toString(),
    added_at: doc.added_at,
    updated_by: doc.updatedBy.toString(),
    updated_at: doc.updated_at,
});