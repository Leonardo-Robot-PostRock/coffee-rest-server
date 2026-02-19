import { IUser } from "../../../../../users/domain/interfaces/user";
import { MongoUserDocument } from "../interfaces/user";

export const userFromMongoToDomain = (doc: MongoUserDocument): IUser => ({
    uid: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    password: doc.password,
    img: doc.img,
    role: doc.role,
    state: doc.state,
    google: doc.google,
    created_at: doc.created_at,
    updated_at: doc.updated_at,
});
