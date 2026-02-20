import { IUser } from "../../../../../users/domain/interfaces/user";
import { MongoUserDocument } from "../interfaces/user";

export const userFromMongoToDomain = (doc: MongoUserDocument): IUser => ({
    uid: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    password: doc.password,
    img: doc.img,
    role: doc.role.toString(),
    state: doc.state,
    google: doc.google,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
