import { MongoUserDocument } from "../app/users/infrastructure/mongoose/interfaces/user";


export { };

declare global {
    namespace Express {
        interface Request {
            uid?: string;
            user?: MongoUserDocument;
        }
    }
}
