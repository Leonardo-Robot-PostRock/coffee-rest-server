import { Router } from 'express';
import { check, query } from 'express-validator';
import { hasRole, isAdminRole, validateJWT } from '../middlewares';
import { isRoleValid, checkEmailExists, checkUserByIdExists, validateFields } from '../helpers/db-validators';

const router = Router();



export default router;