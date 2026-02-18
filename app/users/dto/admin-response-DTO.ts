export interface AdminResponseDTO {
    uid: string;
    name: string;
    email: string;
    role: string;
    state?: boolean;
    img?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class AdminResponseDTO implements AdminResponseDTO {
    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public role: string,
        public state?: boolean,
        public img?: string,
        public created_at?: Date,
        public updated_at?: Date
    ) { }
}