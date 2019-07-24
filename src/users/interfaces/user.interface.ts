import { Document } from 'mongoose';

export interface Wechat extends Document {
  readonly username: string;
  readonly password: number;
}