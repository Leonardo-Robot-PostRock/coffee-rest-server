export interface IUser {
    uid: string;
    name: string;
    email: string;
    password: string;
    img?: string;
    role: string;
    state: boolean;
    google?: boolean;
    createdAt: Date;
    updatedAt?: Date;
}