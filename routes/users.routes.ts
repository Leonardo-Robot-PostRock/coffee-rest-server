import { Router } from 'express';
import { check, query } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { isRoleValid, checkEmailExists, checkUserByIdExists } from '../helpers/db-validators';
import { validateJWT } from '../middlewares/validate-jwt';
import { isAdminRole } from '../middlewares/validate-roles';

const {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
} = require('../controllers/users.controller');

const router = Router();

router.get('/', [
    query('limit', 'El valor de limit debe ser un número').optional().isNumeric(),
    query('from', 'El valor de from debe ser un número').optional().isNumeric(),
    validateFields,
],
    usersGet
);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'Correo no válido').custom(checkEmailExists).isEmail(),
    check('role').custom(isRoleValid),
    validateFields
],
    usersPost
);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkUserByIdExists),
    check('role').custom(isRoleValid),
    validateFields
],
    usersPut
);

router.patch('/', usersPatch);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkUserByIdExists),
    validateFields,
], usersDelete);

export default router;