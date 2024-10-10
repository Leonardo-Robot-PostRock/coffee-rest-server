"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const { check, query } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValid, checkEmailExists, checkUserByIdExists } = require('../helpers/db-validators');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users.controller');
const router = Router();
router.get('/', [
    query('limit', 'El valor de limit debe ser un número').optional().isNumeric(),
    query('from', 'El valor de from debe ser un número').optional().isNumeric(),
    validateFields,
], usersGet);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'Correo no válido').custom(checkEmailExists).isEmail(),
    check('role').custom(isRoleValid),
    validateFields
], usersPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkUserByIdExists),
    check('role').custom(isRoleValid),
    validateFields
], usersPut);
router.patch('/', usersPatch);
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(checkUserByIdExists),
    validateFields
], usersDelete);
exports.default = router;
//# sourceMappingURL=users.routes.js.map