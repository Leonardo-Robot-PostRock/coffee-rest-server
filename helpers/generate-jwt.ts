import jwt from 'jsonwebtoken';
import { secretKey } from '../utils/keyGenerator';

export const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, secretKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    })
}