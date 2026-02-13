import { Router } from 'express';
import { check, query } from 'express-validator';
import { hasRole, isAdminRole, validateJWT } from '../middlewares';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categories';
import { checkCategoryExist, validateFields } from '../helpers/db-validators';

const router = Router();

// Get all categories - paginated - total - populate 
router.get('/', [
    query('limit', 'El límite debe ser un número').optional().isNumeric(),
    query('from', 'El desde debe ser un número').optional().isNumeric(),
    validateFields
], getCategories);

// Get category by id - populate {}
router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'),
    check('id').custom(checkCategoryExist),
    validateFields
], getCategoryById);

// Create category - private - any role with valid token
router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

// Update category - private - any role with valid token
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkCategoryExist),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], updateCategory);

// Delete category - private - only admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkCategoryExist),
    validateFields
], deleteCategory);

export default router;