import { ICategory } from "../../../../../categories/domain/interfaces/category";
import { MongoCategoryDocument } from "../interfaces/category";

export const categoryFromMongoToDomain = (doc: MongoCategoryDocument): ICategory => ({
    uid: doc._id.toString(),
    name: doc.name,
    state: doc.state,
    addedBy: doc.addedBy.toString(),
    addedAt: doc.addedAt,
    updatedBy: doc.updatedBy.toString(),
    updatedAt: doc.updatedAt,
});