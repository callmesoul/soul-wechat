import { Model } from 'mongoose'
import { Injectable, forwardRef, Inject, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserType } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';
import { UserApi, ApiConfigKit } from 'tnw'



@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel('User') private readonly userModel: Model,
  ) {}

  async onModuleInit() {
    
  }

  async findOneByUserName(username: string): Promise<UserType | null> {
    return await this.userModel.findOne().where({username:username});
  }

  async createUser(user: UserInput): Promise<UserType>{
    return await this.userModel.create(user);
  }

  async findById(id: any): Promise<UserType>{
    return await this.userModel.findById(id).exec();;
  }

  async findByOpenId(openId: string): Promise<UserType>{
    return await this.userModel.findOne().where({openid:openId});
  }

  async find(params:any): Promise<UserType []>{
    console.log(params);
    return await this.userModel.fetch(params);
  }
  async update(params:any){
    return await this.userModel.update({_id:params.id},params);
  }

}