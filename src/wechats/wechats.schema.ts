import * as mongoose from 'mongoose';

export const WechatSchema = new mongoose.Schema({
  name: String,
  appId: String,
  appSecret: String,
  createdAt: Date,
  userId:{
    type: String,
    required: true
  }
});