import type { IUser } from '../interfaces/user';

export {};

declare global {
    namespace Express {
        interface Request {
            uid?: string;
            user?: IUser;
        }
    }
}
