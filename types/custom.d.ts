import express from 'express';

declare global {
    namespace Express {
        interface Request {
            uid?: string;
            user?: IUser;
        }
    }
}
