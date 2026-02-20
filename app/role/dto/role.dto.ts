export interface ICreateRoleDto {
    roleName: string;
    addedBy: string;
    addedAt: Date;
}

export interface IResponseRoleDto {
    roleName: string;
}

export interface IUpdateRoleDto {
    roleName: string;
    updatedBy: string;
    updatedAt: Date;
}