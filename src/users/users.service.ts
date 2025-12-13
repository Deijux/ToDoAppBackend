import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto) {
    await this.userModel.create(user);
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email: email });
  }
}
