import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { bcryptSaltOrRounds } from './constants';
import { JwtSignOptions } from '@nestjs/jwt';
import { USER_ROLE } from './enums';

export const jwtHelper = {
  sign(
    data: { id: number; username: string; role: USER_ROLE },
    options?: JwtSignOptions,
  ) {
    return jwt.sign(data, process.env['JWT_KEY'], options);
  },

  verify(data: string) {
    try {
      return jwt.verify(data, process.env['JWT_KEY']);
    } catch (err) {
      return new Error(err);
    }
  },
};

export const bcryptHelper = {
  async hash(passwd: string): Promise<string> {
    return await bcrypt.hash(passwd, bcryptSaltOrRounds);
  },

  async isMatch(hashedPasswd: string, passwd: string): Promise<boolean> {
    return await bcrypt.compare(passwd, hashedPasswd);
  },
};
