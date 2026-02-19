import { ITokenService } from "../../auth/domain/interfaces/token-service";
import { generateJWT } from "../security/generate-jwt";


export class JwtTokenService implements ITokenService {
    async generate(uid: string): Promise<string> {
        const token = await generateJWT(uid) as string;
        return token;
    }
}
