import { IUser } from "../../../../../users/domain/interfaces/user";
import { MongoUserDocument, MongoRole } from "../interfaces/user";

export const userFromMongoToDomain = (doc: MongoUserDocument): IUser => {
    // Handle role as either ObjectId or populated object
    const roleValue = typeof doc.role === 'object' && doc.role !== null && '_id' in doc.role
        ? (doc.role as MongoRole)._id.toString()
        : doc.role.toString();

    return {
        uid: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        password: doc.password,
        img: doc.img,
        role: roleValue,
        state: doc.state,
        google: doc.google,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};
