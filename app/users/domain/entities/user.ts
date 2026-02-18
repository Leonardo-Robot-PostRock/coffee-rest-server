import { UserEntity } from "../interfaces/user";

export class User implements UserEntity {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public state?: boolean,
        public google?: boolean,
        public created_at?: Date,
        public updated_at?: Date
    ) {}
}