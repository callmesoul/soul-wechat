import * as mongoose from 'mongoose';

export const WechatSchema = new mongoose.Schema({
  username: String,
  password: String,
});