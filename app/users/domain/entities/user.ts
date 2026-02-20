import { randomUUID } from "crypto";
import { IUser } from "../interfaces/user";

export class User implements IUser {
    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public state: boolean,
        public img?: string,
        public google?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }

    static create(props: IUser) {
        return new User(
            randomUUID(),
            props.name,
            props.email,
            props.password,
            props.role,
            props.state,
            props.img || '',
            props.google,
            props.createdAt || new Date(),
            props.updatedAt || new Date()
        )
    }
}