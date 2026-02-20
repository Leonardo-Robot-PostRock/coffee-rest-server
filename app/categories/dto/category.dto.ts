export interface ICreateCategoryDTO {
    name: string;
}

export interface IResponseCategoryDTO {
    uid: string;
    name: string;
    state: boolean;
    addedBy: string;
    addedAt: Date;
    updatedBy: string;
    updatedAt: Date;

}

export interface IUpdateCategoryDTO {
    name: string;
    state: boolean;
    updatedBy: string;
    updatedAt: Date;
}