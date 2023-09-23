import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_KEY'],
    });
  }

  async validate(payload: any) {
    try {
      return payload;
    } catch (err) {
      throw new RequestTimeoutException({
        status: 408,
        message:
          'Timed out fetching a new connection from the connection pool!',
        error: true,
      });
    }
  }
}
