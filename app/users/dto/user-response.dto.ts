export interface IUserResponseDTO {
    uid: string;
    name: string;
    email: string;
    role: string;
    state: boolean;
    img?: string;
    createdAt?: Date;
    updatedAt?: Date;
}