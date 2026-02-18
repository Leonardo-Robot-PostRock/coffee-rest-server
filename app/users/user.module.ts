// Infrastructure
import { MongooseUserRepository } from "./infrastructure/mongoose/user.repository";
import { BcryptPasswordHasher } from "../auth/infrastructure/security/bcrypt-password-hasher";

// User Service Layer
import { UserService } from "./services/user.service";

// Presentation
import { buildUserController } from "./presentation/api/user.controller";

// Module Composition
const userRepository = new MongooseUserRepository();
const passwordHasher = new BcryptPasswordHasher();

// Service
const userService = new UserService(
  userRepository,
  passwordHasher
);

// Controller already built with the service
export const userController = buildUserController(userService);
