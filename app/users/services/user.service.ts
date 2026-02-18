import { IUserRepository } from '../domain/repositories/user.repository';

import { IPasswordHasher } from '../../auth/domain/interfaces/password-hasher';

import { UserResponseDTO } from '../dto/user-response-DTO';

import { UserMapper } from './user-mapper';
import { CreateUserDTO } from '../dto/create-user-DTO';
import { UpdateUserDTO } from '../dto/update-user.DTO';

interface GetUsersParams {
    limit?: number;
    from?: number;
}

export class UserService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    async getUsersService({ limit = 5, from = 0 }: GetUsersParams): Promise<{ total: number; users: UserResponseDTO[] }> {
        const { total, users } = await this.userRepository.findActive(limit, from);
        return {
            total,
            users: users.map(UserMapper.toResponseDTO)
        };
    };

    async createUserService({ name, email, password, role }: CreateUserDTO): Promise<UserResponseDTO> {
        const hashedPassword = await this.passwordHasher.hash(password);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return UserMapper.toResponseDTO(user);

    };

    async updateUserService({ id, data }: { id: string; data: UpdateUserDTO }): Promise<UserResponseDTO | null> {
        const { password, ...rest } = data;

        const updatePayload: Partial<UpdateUserDTO> = { ...rest };

        if (password) {
            updatePayload.password = await this.passwordHasher.hash(password);
        }

        updatePayload.updated_at = new Date();

        const updated = await this.userRepository.updateById(id, updatePayload);
        return updated ? UserMapper.toResponseDTO(updated) : null;
    };

    async deleteUserService(id: string): Promise<UserResponseDTO | null> {
        const deleted = await this.userRepository.deleteById(id);
        return deleted ? UserMapper.toResponseDTO(deleted) : null;
    };
}