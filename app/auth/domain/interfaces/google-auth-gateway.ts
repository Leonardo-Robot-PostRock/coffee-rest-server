export interface GoogleUserPayload {
    name: string;
    email: string;
    picture: string;
}

export interface IGoogleAuthGateway {
    verify(idToken: string): Promise<GoogleUserPayload>;
}
