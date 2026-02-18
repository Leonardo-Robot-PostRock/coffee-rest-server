import { Request, Response } from "express";
import { UserService } from "../../services/user.service";

export const buildUserController = (userService: UserService) => ({

    getUsersController: async (req: Request, res: Response) => {
        const { limit = 5, from = 0 } = req.query;
        const result = await userService.getUsersService({
            limit: Number(limit),
            from: Number(from)
        });

        res.status(200).json(result);
    },

    createUserController: async (req: Request, res: Response) => {

        const { name, email, password, role } = req.body;
        const user = await userService.createUserService({ name, email, password, role });

        res.status(201).json({ user });
    },

    updateUserController: async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await userService.updateUserService({ id, data: req.body });

        res.status(200).json({ user })
    },

    patchUserController: (req: Request, res: Response) => {
        res.status(200).json({
            msg: 'patch API - controller'
        })
    },

    deleteUserController: async (req: Request, res: Response) => {

        const { id } = req.params;
        const user = await userService.deleteUserService(id);
        const userAuthenticated = req.user;

        res.status(200).json({
            user,
            userAuthenticated
        })
    }
})