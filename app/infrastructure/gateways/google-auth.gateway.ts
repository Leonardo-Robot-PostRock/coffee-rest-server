import { GoogleUserPayload, IGoogleAuthGateway } from "../../auth/domain/interfaces/google-auth-gateway";
import { googleVerify } from "../security/google-verify";


export class GoogleAuthGateway implements IGoogleAuthGateway {
    async verify(idToken: string): Promise<GoogleUserPayload> {
        return googleVerify(idToken);
    }
}
