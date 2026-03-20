import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto) {
    const userRegistred = await this.findByEmail(user.email);
    if (userRegistred) throw new ConflictException('El correo está en uso');
    await this.userModel.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email: email });
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }
}
