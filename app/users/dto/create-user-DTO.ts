export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: string;
}

export class CreateUserDTO implements CreateUserDTO {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: string
    ) { }
}