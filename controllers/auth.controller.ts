import { Request, Response } from "express";
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateJWT } from "../helpers/generate-jwt";

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

        const token = await generateJWT(user.id);

        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    return;
}

export const googleSignIn = async (req: Request, res: Response) => {
    const { id_token } = req.body;

    res.json({
        id_token
    })
}