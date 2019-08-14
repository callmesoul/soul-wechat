import * as mongoose from 'mongoose';

export const WechatSchema = new mongoose.Schema({
  name: String,
  appId: String,
  appSecret: String,
  token:{
    type: String,
    required: true
  },
  type:{
    type: Number,
    required: true,
    default:1,
  },
  userId:{
    type: String,
    required: true
  },
  encrypt:{
    type: Boolean,
    required: true,
    default: false,
  },
  encodingAesKey:{
    type: String,
    required: false,
    default: '',
  }
});