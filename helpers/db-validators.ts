import Role from '../models/role';
import User from '../models/user';

export const isRoleValid = (async (role: string = '') => {
    const roleExists = await Role.findOne({ role });

    if (!roleExists) {
        throw new Error(`The ${role} is not in the database`)
    }
})

export const checkEmailExists = async (email: string = '') => {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        throw new Error(`The email: ${email} already exists.`)
    }
}

export const checkUserByIdExists = async (id: string) => {
    const userExists = await User.findById(id);

    if (!userExists) {
        throw new Error(`The id, ${id} doesn't exist`);
    }
}