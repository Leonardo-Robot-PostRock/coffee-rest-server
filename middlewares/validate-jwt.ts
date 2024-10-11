import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, PublicKey, Secret } from 'jsonwebtoken';
import User from '../models/user';

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY as Secret | PublicKey);

        if (typeof payload === 'object' && 'uid' in payload) {
            const { uid } = payload as JwtPayload;

            req.uid = uid;

            const user = await User.findById(uid);

            if (!user) {
                return res.status(400).json({
                    msg: 'Token no válido - usuario no existe en DB'
                })
            }

            if (!user.state) {
                return res.status(401).json({
                    msg: 'Token no válido'
                })
            }

            req.user = user;

            next();
        } else {
            return res.status(401).json({
                msg: 'Token no válido  - payload no contiene uid'
            })
        }
    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}