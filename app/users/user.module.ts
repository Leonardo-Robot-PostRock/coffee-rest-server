// Infrastructure
import { BcryptPasswordHasher } from "../infrastructure/security/bcrypt-password-hasher";
import { MongooseUserRepository } from "../infrastructure/persistence/mongoose/users/repository/mongo-user.repository";

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
