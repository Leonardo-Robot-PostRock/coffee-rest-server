import { Router } from "express";
import { roleController } from "../../role.module";
import { validateFields } from "../../../../helpers/db-validators";
import { isAdminRole, validateJWT } from "../../../../middlewares";
import { check } from "express-validator";


const router = Router();

// Get all roles
router.get('/', [
    validateFields
], roleController.getRoles);

// Get a single role by ID
router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    isAdminRole,
    validateFields
], roleController.getRoleById);

// Create a new role
router.post('/', [
    validateJWT,
    isAdminRole,
    check('roleName', 'El nombre del rol es obligatorio').not().isEmpty(),
    validateFields
], roleController.createRole);

// Update an existing role
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    isAdminRole,
    check('roleName', 'El nombre del rol es obligatorio').not().isEmpty(),
    validateFields
], roleController.updateRole);

// Delete a role
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    isAdminRole,
    validateFields
], roleController.deleteRole);

export default router;