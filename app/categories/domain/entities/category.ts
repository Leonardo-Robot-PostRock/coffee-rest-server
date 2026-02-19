import { ICategory } from "../interfaces/category";

export class Category implements ICategory {
    constructor(
        public uid: string,
        public name: string,
        public state: boolean,
        public added_by?: string,
        public added_at?: Date,
        public updated_by?: string,
        public updated_at?: Date
    ) { }

    static create(props: ICategory) {
        return new Category(
            props.uid,
            props.name,
            props.state,
            props.added_by,
            new Date(),
            props.updated_by,
            new Date()
        )
    }
}