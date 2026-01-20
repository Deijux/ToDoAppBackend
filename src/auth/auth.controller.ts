import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUser } from './dto/loginUser.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from './interface/jwtPayload.interface';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user information' })
  @ApiBody({})
  @ApiResponse({
    status: 200,
    description: 'Get user information succesfully',
    example: {
      sub: 'user ID',
      email: 'user email',
      iat: 'token created and issued',
      exp: 'invalid token',
    },
  })
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User sign in' })
  @ApiBody({ type: LoginUser })
  @ApiResponse({
    status: 200,
    description: 'User sign in successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() user: LoginUser,
  ) {
    const { access_token, sub, email } = await this.authService.signIn(user);
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });
    return {
      sub,
      email,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
  }
}
