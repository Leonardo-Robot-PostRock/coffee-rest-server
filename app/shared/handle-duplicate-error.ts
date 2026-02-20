import { MongoServerError } from 'mongodb';

export function handleDuplicateError(error: unknown, value: string, ErrorClass: new (value: string) => Error): never {
    if (error instanceof MongoServerError && error.code === 11000) {
        throw new ErrorClass(value);
    }
    
    throw error;
}