export class DuplicateCategoryError extends Error {
    constructor(name: string) {
        super(`La categoría ${name} ya existe`);
        this.name = "DuplicateCategoryError";
    }
}
