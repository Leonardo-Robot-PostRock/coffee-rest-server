export class CategoryNotFoundError extends Error {
    constructor(id: string) {
        super(`No existe la categoría con id ${id}`);
        this.name = "CategoryNotFoundError";
    }
}
