import * as mongoose from 'mongoose';
import { parseAsync } from '@babel/core';

const UserSchema = new mongoose.Schema({
  subscribe: Number,
  openid: String,
  nickname: String,
  sex: Number,
  language: String,
  city: String,
  province: String,
  country: String,
  headimgurl: String,
  subscribe_time: Date,
  unionid: String,
  remark: String,
  groupid: String,
  tagid_list: Array,
  subscribe_scene: String,
  qr_scene: Number,
  qr_scene_str: String,
  wechatId: String,
  status: { type: Number, default: 1 }, // 状态 1:正常 2.黑名单
});

UserSchema.statics = {
  async fetch(params) {
    let users = await this.find(params.where)
      .skip((params.page - 1) * params.pageSize)
      .limit(params.pageSize)
      .sort({'_id': -1})
    let total = await this.count(params.where)
    let pageCount = Math.ceil(total/params.pageSize)

    return {
      users:users,
      pagination:{
        total: total,
        page: params.page,
        pageCount: pageCount,
        pageSize: params.pageSize,
      }
    }
  }
}

export { UserSchema }