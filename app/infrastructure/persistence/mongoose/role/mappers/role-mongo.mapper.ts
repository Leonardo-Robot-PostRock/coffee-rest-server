import { IRole } from "../../../../../role/domain/interfaces/role";
import { MongoRoleDocument } from "../interfaces/role";

export const roleFromMongoToDomain = (doc: MongoRoleDocument): IRole => ({
    uid: doc._id.toString(),
    roleName: doc.roleName,
    state: doc.state,
    addedBy: doc.addedBy.toString(),
    addedAt: doc.addedAt,
    updatedBy: doc.updatedBy.toString(),
    updatedAt: doc.updatedAt,
})