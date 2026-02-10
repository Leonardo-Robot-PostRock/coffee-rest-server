import { Router } from 'express';
import { check, query } from 'express-validator';
import { hasRole, isAdminRole, validateJWT } from '../middlewares';
import { isRoleValid, checkEmailExists, checkUserByIdExists, validateFields } from '../helpers/db-validators';

const router = Router();


// Get all categories - public
router.get('/', (req, res) => {
    res.json('Todo ok')
})

// Get category by id - public
router.get('/:id', (req, res) => {
    res.json('get - id')
})

// Create category - private - any role with valid token
router.post('/', [
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], (req, res) => {
    res.json('post')
})

// Update category - private - any role with valid token
router.put('/:id', (req, res) => {
    res.json('put')
})

// Delete category - private - only admin
router.delete('/:id', (req, res) => {
    res.json('delete')
})



export default router;