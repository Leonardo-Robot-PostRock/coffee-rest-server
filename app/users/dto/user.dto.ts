export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface IUpdateUserDTO {
    name?: string;
    password?: string;
    email: string;
    updatedAt: Date;
}

export interface IUserResponseDTO {
    uid: string;
    name: string;
    email: string;
    role: string;
    state: boolean;
    img?: string;
    createdAt: Date;
    updatedAt?: Date;
}