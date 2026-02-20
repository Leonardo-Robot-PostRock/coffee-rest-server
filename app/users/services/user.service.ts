// Repositories
import { IUserRepository } from '../domain/repositories/user.repository';

// Interfaces
import { IPasswordHasher } from '../../auth/domain/interfaces/password-hasher';

// Mappers
import { UserMapper } from './user.mapper';

// DTOs
import { ICreateUserDTO, IUpdateUserDTO, IUserResponseDTO } from '../dto';

interface GetUsersParams {
    limit?: number;
    from?: number;
}

export class UserService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    async getUsersService({ limit = 5, from = 0 }: GetUsersParams): Promise<{ total: number; users: IUserResponseDTO[] }> {
        const { total, users } = await this.userRepository.findActive(limit, from);

        return {
            total,
            users: users.map(UserMapper.toResponseDTO)
        };
    };

    async createUserService({ name, email, password, role }: ICreateUserDTO): Promise<IUserResponseDTO> {
        const hashedPassword = await this.passwordHasher.hash(password);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return UserMapper.toResponseDTO(user);
    };

    async updateUserService({ id, data }: { id: string; data: IUpdateUserDTO }): Promise<IUserResponseDTO | null> {
        const { password, ...rest } = data;

        const updatePayload: Partial<IUpdateUserDTO> = { ...rest };

        if (password) {
            updatePayload.password = await this.passwordHasher.hash(password);
        }

        updatePayload.updatedAt = new Date();

        const updated = await this.userRepository.updateById(id, updatePayload);

        return updated ? UserMapper.toResponseDTO(updated) : null;
    };

    async deleteUserService(id: string): Promise<IUserResponseDTO | null> {
        const deleted = await this.userRepository.deleteById(id);

        return deleted ? UserMapper.toResponseDTO(deleted) : null;
    };
}