import { IPasswordHasher } from "../domain/interfaces/password-hasher";
import { IAuthRepository } from "../domain/repositories/auth.repository";
import { ITokenService } from "../domain/interfaces/token-service";
import { IGoogleAuthGateway } from "../domain/interfaces/google-auth-gateway";

import { HttpError } from "../../shared/http-error";

export class AuthService {

    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenService: ITokenService,
        private readonly googleAuthGateway: IGoogleAuthGateway,
    ) { }

    async findUserByEmail(email: string) {
        return await this.authRepository.findUserByEmail(email);
    }

    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await this.passwordHasher.compare(plainPassword, hashedPassword);
    }

    async generateHashedRandomPassword(): Promise<string> {
        return await this.passwordHasher.generateHashedRandomPassword();
    }

    async login(email: string, password: string) {
        const user = await this.findUserByEmail(email);

        if (!user) {
            throw new HttpError(401, "Usuario / Password no son correctos");
        }

        if (!user.state) {
            throw new HttpError(403, "Usuario bloqueado, hable con el administrador");
        }

        const validPassword = await this.verifyPassword(password, user.password);

        if (!validPassword) {
            throw new HttpError(401, "Usuario / Password no son correctos");
        }

        const token = await this.tokenService.generate(user.uid as string);

        return {
            user,
            token,
        };
    }

    async googleSignIn(idToken: string) {
        try {
            const payload = await this.googleAuthGateway.verify(idToken);

            const { email, name, picture } = payload;

            let user = await this.findUserByEmail(email);

            if (!user) {
                const hashedPassword = await this.generateHashedRandomPassword();

                const newUser = await this.authRepository.createGoogleUser({
                    name,
                    email,
                    password: hashedPassword,
                    img: picture,
                    role: "USER_ROLE",
                });

                const token = await this.tokenService.generate(newUser.uid as string);

                return {
                    user: newUser,
                    token,
                };
            }

            if (!user.google) {
                throw new HttpError(400, "El correo ya está registrado. Use autenticación normal.");
            }

            if (!user.state) {
                throw new HttpError(403, "Usuario bloqueado, hable con el administrador");
            }

            const token = await this.tokenService.generate(user.uid as string);

            return {
                user,
                token,
            };
        } catch (error) {
            throw new HttpError(401, "Token de Google no es válido");
        }
    }
}