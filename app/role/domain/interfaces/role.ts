export interface IRole {
    uid: string;
    roleName: string;
    state: boolean;
    addedBy: string;
    addedAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
}