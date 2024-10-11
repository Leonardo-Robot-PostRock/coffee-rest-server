import { randomBytes } from 'crypto';

const generateSecretKey = () => {
    return randomBytes(64).toString('base64');
};

const secretKey = process.env.SECRETORPRIVATEKEY || generateSecretKey();

export { secretKey };
