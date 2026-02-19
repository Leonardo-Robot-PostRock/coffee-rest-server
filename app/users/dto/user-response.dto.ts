export interface IUserResponseDTO {
    uid: string;
    name: string;
    email: string;
    role: string;
    state: boolean;
    img?: string;
    created_at?: Date;
    updated_at?: Date;
}