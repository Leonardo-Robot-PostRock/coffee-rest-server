import { IRole } from "../interfaces/role";

export class Role {
    constructor(
        public uid: string,
        public roleName: string,
        public state: boolean,
        public addedBy?: string,
        public addedAt?: Date,
        public updatedBy?: string,
        public updatedAt?: Date
    ) { }

    static create(props: IRole) {
        return new Role(
            props.uid,
            props.roleName,
            props.state,
            props.addedBy,
            props.addedAt ?? new Date(),
            props.updatedBy,
            props.updatedAt ?? new Date()
        )
    }
}