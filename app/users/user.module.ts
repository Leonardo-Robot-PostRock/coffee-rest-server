// Infrastructure (Security)
import { BcryptPasswordHasher } from "../infrastructure/security/bcrypt-password-hasher";

// Repository (Data Access Layer - infrastructure)
import { MongooseUserRepository } from "../infrastructure/persistence/mongoose/users/repository/mongo-user.repository";

// Application Service Layer
import { UserService } from "./services/user.service";

// Controller (Presentation Layer)
import { buildUserController } from "./presentation/api/user.controller";

// Module Assembler
const userRepository = new MongooseUserRepository();
const passwordHasher = new BcryptPasswordHasher();

const userService = new UserService(
  userRepository,
  passwordHasher
);

// Controller already built with the service
export const userController = buildUserController(userService);
