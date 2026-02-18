export interface IUser {
    uid: string;
    name: string;
    email: string;
    password: string;
    img?: string;
    role: string;
    state?: boolean;
    google?: boolean;
    created_at?: Date;
    updated_at?: Date;
}