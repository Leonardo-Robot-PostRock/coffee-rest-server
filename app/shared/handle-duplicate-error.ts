import { MongoServerError } from 'mongodb';

// Translate the MongoDB duplicate key technical error into a more specific domain error for the application
export function handleDuplicateError(error: unknown, value: string, ErrorClass: new (value: string) => Error): never {
    if (error instanceof MongoServerError && error.code === 11000) {
        throw new ErrorClass(value);
    }
    
    throw error;
}