import { Router } from 'express';
import { check, query } from 'express-validator';
import { hasRole, isAdminRole, validateJWT } from '../../../../middlewares';
import { isRoleValid, checkEmailExists, checkUserByIdExists, validateFields } from '../../../../helpers/db-validators';

import { userController } from '../../user.module';

const router = Router();

// Get all users - paginated - total
router.get('/', [
    query('limit', 'El valor de limit debe ser un número').optional().isNumeric(),
    query('from', 'El valor de from debe ser un número').optional().isNumeric(),
    validateFields,
],
    userController.getUsersController
);

// Create user - private - any role with valid token
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'Correo no válido').custom(checkEmailExists).isEmail(),
    check('role').custom(isRoleValid),
    validateFields
],
    userController.createUserController
);

// Update user - private - any role with valid token
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'),
    check('id').custom(checkUserByIdExists),
    check('role').custom(isRoleValid),
    validateFields
],
    userController.updateUserController
);

router.patch('/', userController.patchUserController);

// Delete user - private - only admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkUserByIdExists),
    validateFields,
], userController.deleteUserController);

export default router;