import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY as string, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    })
}