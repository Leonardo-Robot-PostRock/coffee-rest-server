import { Request, Response } from "express";
import User from '../models/user';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
            return;
        }

        if (!user.state) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - state: false'
            })
            return;
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
            return;
        }

        res.status(200).json({
            msg: 'login ok'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    return;
}