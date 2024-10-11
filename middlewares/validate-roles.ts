import { NextFunction, Request, Response } from "express";


export const isAdminRole = (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin verificar el token primero'
        })
    }
    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es administrador - No puede ejecutar esta acción`
        })
    }

    next();
}