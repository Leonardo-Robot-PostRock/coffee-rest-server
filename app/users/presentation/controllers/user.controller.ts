import { Request, Response } from "express";
import {
    getUsersService,
    createUserService,
    updateUserService,
    deleteUserService
} from "../../application/user.service";

const getUsersController = async (req: Request, res: Response) => {

    const { limit = 5, from = 0 } = req.query;
    const result = await getUsersService({
        limit: Number(limit),
        from: Number(from)
    });

    res.status(200).json(result);
};

const createUserController = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body;
    const user = await createUserService({ name, email, password, role });

    res.status(201).json({ user });
}

const updateUserController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await updateUserService({ id, data: req.body });

    res.status(200).json({ user })
}

const patchUserController = (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'patch API - controller'
    })
}

const deleteUserController = async (req: Request, res: Response) => {

    const { id } = req.params;
    const user = await deleteUserService({ id });
    const userAuthenticated = req.user;

    res.status(200).json({
        user,
        userAuthenticated
    })
}

export {
    getUsersController,
    createUserController,
    updateUserController,
    patchUserController,
    deleteUserController
}