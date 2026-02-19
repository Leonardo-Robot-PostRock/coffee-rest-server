import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../../../../helpers/db-validators";
import { authController } from "../../auth.module";

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo debe ser obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  authController.loginController
);

router.post(
  "/google",
  [check("id_token", "id_token es necesario").not().isEmpty(), validateFields],
  authController.googleSignInController
);

export default router;
