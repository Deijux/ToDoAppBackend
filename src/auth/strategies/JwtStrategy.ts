import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../interface/jwtPayload.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          const token = request?.cookies?.access_token as string | undefined;
          return token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey_temporal_solo_dev',
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Payload recibido en JwtStrategy:', payload);

    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    return {
      sub: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
