import { IUser } from "../domain/interfaces/user";
import { AdminResponseDTO } from "../dto/admin-response-DTO";
import { CreateUserDTO } from "../dto/create-user-DTO";
import { UserResponseDTO } from '../dto/user-response-DTO';

export class UserMapper {
    static toCreateUserDTO(user: IUser): CreateUserDTO {
        return new CreateUserDTO(
            user.name,
            user.email,
            user.password,
            user.role
        );
    }

    static toResponseDTO(user: IUser): UserResponseDTO {
        return new UserResponseDTO(
            user.uid,
            user.name,
            user.email,
            user.role,
            user?.img,
            user?.created_at,
            user?.updated_at
        );
    }

    static toAdminResponseDTO(user: IUser): AdminResponseDTO {
        return new AdminResponseDTO(
            user.uid,
            user.name,
            user.email,
            user.role ?? '',
            user.state,
            user.img,
            user.created_at,
            user.updated_at
        );
    }
}
