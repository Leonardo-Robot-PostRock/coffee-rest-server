// Domain
import { IUser } from "../domain/interfaces/user";

// DTOs
import { ICreateUserDTO, IUpdateUserDTO, IUserResponseDTO } from "../dto"

export class UserMapper {
    static toCreateUserDTO(user: IUser): ICreateUserDTO {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        };
    }

    static toResponseDTO(user: IUser): IUserResponseDTO {
        return {
            uid: user.uid,
            name: user.name,
            email: user.email,
            role: user.role,
            state: user.state,
            img: user.img,
            created_at: user.created_at,
            updated_at: user.updated_at
        };
    }

    static toUpdateUserDTO(user: IUser): Partial<IUpdateUserDTO> {
        return {
            name: user.name,
            password: user.password,
            email: user.email,
            updated_at: user.updated_at
        };
    }
}
