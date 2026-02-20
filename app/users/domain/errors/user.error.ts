export abstract class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserError";
    }
}

export class DuplicateUserError extends UserError {
    constructor(email: string) {
        super(`El usuario con correo "${email}" ya existe`);
        this.name = "DuplicateUserError";
    }
}

export class UserNotFoundByIdError extends UserError {
    constructor(id: string | number) {
        super(`No existe el usuario con id ${id}`);
        this.name = "UserNotFoundByIdError";
    }
}

export class UserNotFoundByEmailError extends UserError {
    constructor(email: string) {
        super(`No existe el usuario con correo ${email}`);
        this.name = "UserNotFoundByEmailError";
    }
}

export class InvalidPasswordError extends UserError {
    constructor() {
        super(`La contraseña inválida`);
        this.name = "InvalidPasswordError";
    }
}
