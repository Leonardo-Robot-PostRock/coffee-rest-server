export interface ITokenService {
    generate(uid: string): Promise<string>;
}
