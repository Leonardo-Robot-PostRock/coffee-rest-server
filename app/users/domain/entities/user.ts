import { randomUUID } from "crypto";
import { IUser } from "../interfaces/user";

export class User implements IUser {
    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public img?: string,
        public state?: boolean,
        public google?: boolean,
        public created_at?: Date,
        public updated_at?: Date
    ) { }

    static create(props: IUser) {
        return new User(
            randomUUID(),
            props.name,
            props.email,
            props.password,
            props.role,
            props.img || '',
            props.state,
            props.google,
            new Date(),
            new Date()
        )
    }
}