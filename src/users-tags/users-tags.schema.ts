import * as mongoose from 'mongoose';

export const UserTagSchema = new mongoose.Schema({
  id:Number,       
  name:String,      
  count:Number,
  wechatId: String
});