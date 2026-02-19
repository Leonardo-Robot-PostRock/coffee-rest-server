// Infrastructure
import { MongooseAuthRepository } from "../infrastructure/persistence/mongoose/auth/repository/auth.repository";

// Service Layer
import { AuthService } from "./services/auth.service";

// Presentation
import { buildAuthController } from "./presentation/api/auth.controller";

// Infrastructure implementations: getaways, token services, password hashing
import { JwtTokenService } from "../infrastructure/token/jwt-token.service";
import { GoogleAuthGateway } from "../infrastructure/gateways/google-auth.gateway";
import { BcryptPasswordHasher } from "../infrastructure/security/bcrypt-password-hasher";


// Module Composition
const authRepository = new MongooseAuthRepository();
const passwordHasher = new BcryptPasswordHasher();  
const tokenService = new JwtTokenService();
const googleAuthGateway = new GoogleAuthGateway();

// Service
const authService = new AuthService(
    authRepository,
    passwordHasher,
    tokenService,
    googleAuthGateway,
);

// Controller already built with the service
export const authController = buildAuthController(authService);
