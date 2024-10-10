"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'El correo debe ser obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validate_fields_1.validateFields
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map