import bcrypt from 'bcryptjs';
import { IPasswordHasher } from '../../domain/interfaces/password-hasher';

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
}