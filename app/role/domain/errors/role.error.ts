export abstract class RoleError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RoleError";
    }
}

export class DuplicateRoleError extends RoleError {
    constructor(role: string) {
        super(`El rol "${role}" ya existe`);
        this.name = "DuplicateRoleError";
    }
}

export class RoleNotFoundByIdError extends RoleError {
    constructor(id: string | number) {
        super(`No existe el rol con id ${id}`);
        this.name = "RoleNotFoundByIdError";
    }
}

export class RoleNotFoundByNameError extends RoleError {
    constructor(name: string) {
        super(`No existe el rol con nombre ${name}`);
        this.name = "RoleNotFoundByNameError";
    }
}