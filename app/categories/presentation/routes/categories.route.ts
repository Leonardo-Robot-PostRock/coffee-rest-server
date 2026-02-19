import { Router } from 'express';
import { check, query } from 'express-validator';
import { hasRole, isAdminRole, validateJWT } from '../../../../middlewares';
import { checkCategoryExist, validateFields } from '../../../../helpers/db-validators';
import { categoryController } from '../../category.module';

const router = Router();

router.get('/', [
    query('limit', 'El límite debe ser un número').optional().isNumeric(),
    query('from', 'El desde debe ser un número').optional().isNumeric(),
    validateFields,
], categoryController.getCategories);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'),
    check('id').custom(checkCategoryExist),
    validateFields,
], categoryController.getCategoryById);

router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], categoryController.createCategory);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkCategoryExist),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], categoryController.updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkCategoryExist),
    validateFields,
], categoryController.deleteCategory);

export default router;
