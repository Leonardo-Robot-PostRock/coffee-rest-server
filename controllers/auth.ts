import { Request, Response } from "express";
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateJWT } from "../helpers/generate-jwt";
import { googleVerify } from "../helpers/google-verify";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Verify if user exists
        if (!user) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
            return;
        }

        // Verify if user is active
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

    try {

        const { email, name, picture } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        // If user does not exist, create it
        if (!user) {
            const data = {
                name,
                email,
                password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 10),
                img: picture,
                role: 'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        // If the user exists but was registered traditionally, prevent duplicate accounts
        if (!user.google) {
            res.status(400).json({
                msg: 'El correo ya está registrado. Use autenticación normal.'
            });
            return;
        }

        if (!user.state) {
            res.status(401).json({
                msg: 'Usuario bloqueado, hable con el administrador'
            });
            return;
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es válido'
        })
    }
}