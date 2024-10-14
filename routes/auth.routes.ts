import { Router } from 'express';
import { check, query } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', [
    check('email', 'El correo debe ser obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields], login)

export default router;