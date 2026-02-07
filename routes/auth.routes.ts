import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../helpers/validate-fields';
import { googleSignIn, login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', [
    check('email', 'El correo debe ser obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields], login);

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateFields
], googleSignIn);

export default router;