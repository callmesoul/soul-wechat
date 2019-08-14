import { Document } from 'mongoose';

enum type {GZH, XCX};

export interface Wechat extends Document {
  readonly name: string;
  readonly type: number;//类型 1 公众号 2 小程序
  readonly appId: string;
  readonly appSecret: string;
  readonly token: string;
  readonly encrypt: string;
  readonly encodingAesKey: string;
  readonly userId: number;
}