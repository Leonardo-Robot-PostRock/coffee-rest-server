export class UserResponseDTO {
    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public role: string,
        public img?: string,
        public created_at?: Date,
        public updated_at?: Date
    ) { }
}