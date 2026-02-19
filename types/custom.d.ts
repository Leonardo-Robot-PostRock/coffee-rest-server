import { IUser } from "../app/users/domain/interfaces/user";

export { };

declare global {
    namespace Express {
        interface Request {
            uid?: string;
            user?: IUser;
        }
    }
}
