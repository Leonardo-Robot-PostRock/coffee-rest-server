// Domain errors
import { DuplicateCategoryError } from "../../categories/domain/errors";

// Domain interface
import { IRole } from "../domain/interfaces/role";

// Repositories interfaces
import { IRoleRepository } from "../domain/repository/role.repository";

// DTOs
import { ICreateRoleDto, IResponseRoleDto, IUpdateRoleDto } from "../dto/role.dto";

// Mappers
import { RoleMapper } from "./role.mapper";

export class RoleService {
    constructor(private readonly roleRepository: IRoleRepository) { }

    async getRolesService(): Promise<IResponseRoleDto[]> {
        const roles = await this.roleRepository.findActive();

        return roles.map(RoleMapper.toResponseDTO);
    }

    async getRoleByIdService(id: string): Promise<IResponseRoleDto | null> {
        const role = await this.roleRepository.findById(id);

        return role ? RoleMapper.toResponseDTO(role) : null;
    }

    async createRoleService(dto: ICreateRoleDto, addedBy: string): Promise<ICreateRoleDto> {
        const roleNameUpper = dto.roleName.toUpperCase();

        const existingRole = await this.roleRepository.findByName(roleNameUpper);

        if (existingRole) {
            throw new DuplicateCategoryError(roleNameUpper);
        }

        const data = {
            roleName: roleNameUpper,
            addedBy
        };

        const createdRole = await this.roleRepository.create(data.roleName, data.addedBy);

        return RoleMapper.toCreateDTO(createdRole);
    }

    async updateRoleService(id: string, roleName: string, updatedBy: string): Promise<IUpdateRoleDto | null> {
        const roleNameUpper = roleName.toUpperCase();

        const existingRole = await this.roleRepository.findByName(roleNameUpper);

        if (existingRole && existingRole.uid !== id) {
            throw new DuplicateCategoryError(roleNameUpper);
        }

        const data: Partial<IRole> = {
            roleName: roleNameUpper,
            updatedBy,
            updatedAt: new Date()
        };

        const updatedRole = await this.roleRepository.updateById(id, data);

        return updatedRole ? RoleMapper.toUpdateDTO(updatedRole) : null;
    }

    async deleteRoleService(id: string, updatedBy: string): Promise<IUpdateRoleDto | null> {
        const data: Partial<IRole> = {
            state: false,
            updatedBy: updatedBy,
            updatedAt: new Date()
        };

        const deletedRole = await this.roleRepository.updateById(id, data);

        return deletedRole ? RoleMapper.toUpdateDTO(deletedRole) : null;
    }
}