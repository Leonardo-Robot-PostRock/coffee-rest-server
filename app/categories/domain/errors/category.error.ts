// Category errors
export abstract class CategoryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CategoryError";
    }
}

// Category not found errors by id
export class CategoryNotFoundByIdError extends CategoryError {
    constructor(id: string | number) {
        super(`No existe la categoría con id ${id}`);
        this.name = "CategoryNotFoundByIdError";
    }
}

// Category not found errors by name
export class CategoryNotFoundByNameError extends CategoryError {
    constructor(name: string) {
        super(`No existe la categoría con nombre ${name}`);
        this.name = "CategoryNotFoundByNameError";
    }
}

// Duplicate category error
export class DuplicateCategoryError extends CategoryError {
    constructor(name: string) {
        super(`La categoría ${name} ya existe`);
        this.name = "DuplicateCategoryError";
    }
}