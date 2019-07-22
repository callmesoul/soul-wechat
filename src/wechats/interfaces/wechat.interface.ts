import { Document } from 'mongoose';

export interface Wechat extends Document {
  readonly name: string;
  readonly type: number;//类型 1 公众号 2 小程序
  readonly appId: string;
  readonly appSecret: string;
  readonly createdAt: Date;
}