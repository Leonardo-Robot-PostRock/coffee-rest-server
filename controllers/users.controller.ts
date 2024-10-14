import { Request, Response } from "express";
import User from '../models/user';
import bcrypt from 'bcryptjs';

export const usersGet = async (req: Request, res: Response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
    ]);

    res.json({
        total,
        users
    });
};

export const usersPost = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.json({
        user
    })
}

export const usersPut = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();

        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        user
    })
}

export const usersPatch = (req: Request, res: Response) => {
    res.json({
        msg: 'patch API - controller'
    })
}

export const usersDelete = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { state: false })

    res.json({
        user
    })
}