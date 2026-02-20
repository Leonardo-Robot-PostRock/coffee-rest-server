export interface ICategory {
    uid: string;
    name: string;
    state: boolean;
    addedBy?: string;
    addedAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
}