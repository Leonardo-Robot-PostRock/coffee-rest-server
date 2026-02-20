import { IRole } from "../domain/interfaces/role";
import { ICreateRoleDto, IResponseRoleDto, IUpdateRoleDto } from "../dto/role.dto";

export class RoleMapper {
    static toResponseDTO(role: IRole): IResponseRoleDto {
        return {
            roleName: role.roleName,
        };
    }

    static toUpdateDTO(role: IRole): IUpdateRoleDto{
        return {
            roleName: role.roleName,
            updatedBy: role.updatedBy || '',
            updatedAt: role.updatedAt!,
        };
    }
    static toCreateDTO(role: IRole): ICreateRoleDto {
        return {
            roleName: role.roleName,
            addedBy: role.addedBy,
            addedAt: role.addedAt,
        };
    }
}