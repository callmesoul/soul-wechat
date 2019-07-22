import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wechat } from './interfaces/wechat.interface';
import { WechatInput } from './inputs/wechat.input';

@Injectable()
export class WechatsService {
  constructor(@InjectModel('Wechat') private readonly wechatModel: Model<Wechat>) {}

  async create(WechatType: WechatInput): Promise<Wechat> {
    const createdWechat = new this.wechatModel(WechatType);
    return await createdWechat.save();
  }

  async findAll(): Promise<Wechat[]> {
    return await this.wechatModel.find().exec();
  }
}
