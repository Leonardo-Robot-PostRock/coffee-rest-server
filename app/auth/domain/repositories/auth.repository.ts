import { IUser } from '../../../users/domain/interfaces/user';

export interface IAuthRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createGoogleUser(data: {
        name: string;
        email: string;
        password: string;
        img?: string;
        role: string;
    }): Promise<IUser>;
}