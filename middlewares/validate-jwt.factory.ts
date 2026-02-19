import { MongooseUserRepository } from '../app/infrastructure/persistence/mongoose/users/repository/mongo-user.repository';
import { buildValidateJWT } from './validate-jwt';

const defaultUserRepository = new MongooseUserRepository();
export const validateJWT = buildValidateJWT(defaultUserRepository);
