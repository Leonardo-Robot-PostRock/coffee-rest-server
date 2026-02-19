import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { IPasswordHasher } from '../../auth/domain/interfaces/password-hasher';

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  async generateHashedRandomPassword(): Promise<string> {
    const plain = randomUUID().replace(/-/g, '').slice(0, 16);
    return this.hash(plain);
  }
}