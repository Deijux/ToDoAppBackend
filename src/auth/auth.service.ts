import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginUser } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: User) {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(user.password, salt);
    const userCreate = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: passwordHashed,
    };
    await this.usersService.create(userCreate);
  }

  async signIn(user: LoginUser) {
    const findUser = await this.usersService.findOne(user.email);
    if (!findUser)
      throw new NotFoundException(
        `No se encontró usuario para el correo ${user.email}`,
      );
    const isMatch = await bcrypt.compare(user.password, findUser.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: findUser._id, email: findUser.email };
    return await this.jwtService.signAsync(payload);
  }
}
