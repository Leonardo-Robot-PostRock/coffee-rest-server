import bcrypt from 'bcryptjs';
import { UserRepository } from '../infrastructure/persistence/user.repository';

interface GetUsersParams {
    limit?: number;
    from?: number;
}

const userRepository = new UserRepository();

export const getUsersService = async ({ limit = 5, from = 0 }: GetUsersParams) => {
    return await userRepository.findActive(limit, from);
};

interface CreateUserParams {
    name: string;
    email: string;
    password: string;
    role: string;
}

export const createUserService = async ({ name, email, password, role }: CreateUserParams) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return await userRepository.create({
        name,
        email,
        password: hashedPassword,
        role
    })

};

interface UpdateUserParams {
    id: string;
    data: {
        password?: string;
        google?: boolean;
        email?: string;
        [key: string]: any;
    };
}

export const updateUserService = async ({ id, data }: UpdateUserParams) => {
    const { _id, password, google, email, ...rest } = data;

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    rest.updated_at = new Date();

    return await userRepository.updateById(id, rest);
};

interface DeleteUserParams {
    id: string;
}

export const deleteUserService = async ({ id }: DeleteUserParams) => {
    return await userRepository.deleteById(id);
};
