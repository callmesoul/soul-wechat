import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface'
import { UserType } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';



@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly wechatModel: Model<User>) {}

  async findOneByUserName(username: string): Promise<UserType | null> {
    return await this.wechatModel.findOne().where({username:username});
  }

  async createUser(user: UserInput): Promise<UserType>{
    return await this.wechatModel.create(user);
  }
}