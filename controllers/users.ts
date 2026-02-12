import { Request, Response } from "express";
import User from '../models/user';
import bcrypt from 'bcryptjs';

const usersGet = async (req: Request, res: Response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
    ]);

    res.status(200).json({
        total,
        users
    });
};

const usersPost = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
        user
    })
}

const usersPut = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();

        rest.password = bcrypt.hashSync(password, salt);
    }

    // Update timestamp for last modification
    rest.updated_at = new Date();

    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.status(200).json({
        user
    })
}

const usersPatch = (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'patch API - controller'
    })
}

const usersDelete = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { state: false });
    const userAuthenticated = req.user;

    res.status(200).json({
        user,
        userAuthenticated
    })
}

export {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}