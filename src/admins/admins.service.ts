import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminModule } from './admins.module';
import { AdminInput } from './inputs/admin.input';
import { AdminType } from './dto/create-admin.dto';



@Injectable()
export class AdminsService {
  constructor(@InjectModel('Admin') private readonly adminModel: Model<AdminModule>) {}

  async createAdmin(params: AdminInput){
    return await this.adminModel.create(params);
  }

  async findById(id: string){
    return await this.adminModel.findById(id);
  }

  async findOneByEmail(email:string){
    return await this.adminModel.findOne().where({email:email}).exec();
  }
}