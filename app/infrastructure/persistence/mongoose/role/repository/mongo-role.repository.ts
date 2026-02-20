// Role mongoose model
import { Role } from "../models/role.model";

// Repository interface
import { IRoleRepository } from "../../../../../role/domain/repository/role.repository";

// Domain
import { IRole } from "../../../../../role/domain/interfaces/role";

// Mappers
import { roleFromMongoToDomain } from "../mappers/role-mongo.mapper";

// Handle duplicate errors
import { handleDuplicateError } from "../../../../../shared/handle-duplicate-error";

// Domain errors
import { DuplicateRoleError } from "../../../../../role/domain/errors/role.error";

export class MongooseRoleRepository implements IRoleRepository {
    async findByName(name: string): Promise<IRole | null> {
        const role = await Role.findOne({ roleName: name });

        return role ? roleFromMongoToDomain(role) : null;
    }

    async findActive(): Promise<IRole[]> {
        const roles = await Role.find({ state: true });

        return roles.map(roleFromMongoToDomain);
    }

    async create(name: string, addedBy: string): Promise<IRole> {
        try {
            const mongoRole = new Role({
                roleName: name,
                state: true,
                addedBy: addedBy,
                addedAt: new Date(),
                updatedBy: null,
                updatedAt: null,
            });

            await mongoRole.save();

            return roleFromMongoToDomain(mongoRole);
        } catch (error: any) {
            handleDuplicateError(error, name, DuplicateRoleError);
        }
    }

    async findById(id: string): Promise<IRole | null> {
        const role = await Role.findById(id);

        return role ? roleFromMongoToDomain(role) : null;
    }

    async updateById(id: string, data: Partial<IRole>): Promise<IRole | null> {
        try {
            const updatedRole = await Role.findByIdAndUpdate(id, data, { new: true })
                .populate('addedBy', 'name email')
                .populate('updatedBy', 'name email');

            return updatedRole ? roleFromMongoToDomain(updatedRole) : null;
        } catch (error) {
            handleDuplicateError(error, String(data.roleName), DuplicateRoleError);
        }
    }

    async deleteById(id: string): Promise<IRole | null> {
        const deletedRole = await Role.findByIdAndDelete(id);

        return deletedRole ? roleFromMongoToDomain(deletedRole) : null;
    }
}