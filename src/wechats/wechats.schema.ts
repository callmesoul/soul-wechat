import * as mongoose from 'mongoose';
import { UserSchema } from '../users/users.schema';

export const WechatSchema = new mongoose.Schema({
  name: String,
  appId: String,
  appSecret: String,
  createdAt: Date,
  user:{
    type: UserSchema,
    required: true
  }
});