import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userName: String,
  passWord: String,
});