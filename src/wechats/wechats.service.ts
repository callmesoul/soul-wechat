import { Model } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wechat } from './interfaces/wechat.interface';
import { WechatInput } from './inputs/wechat.input';
import { WechatType } from './dto/create-wechat.dto';
import { ApiConfigKit, ApiConfig, UserApi, TagApi } from 'tnw'
import { UsersService } from '../users/users.service';
import { UsersTagsService } from '../users-tags/users-tags.service';

@Injectable()
export class WechatsService implements OnModuleInit {
  constructor(
    @InjectModel('Wechat') private readonly wechatModel: Model<Wechat>,
    private readonly userService: UsersService,
    private readonly usersTagsService: UsersTagsService
  ) { }

  async onModuleInit() {
    let wechats = await this.wechatModel.find();
    wechats.map( wechat =>{
      let apiConfig = new ApiConfig(wechat.token, wechat.appId, wechat.appSecret, wechat.encrypt, wechat.encodingAesKey)
      ApiConfigKit.putApiConfig(apiConfig);
    })
    console.log('初始化wechat...')
  }

  async create(params: WechatType): Promise<WechatType> {
    let wechat = await this.wechatModel.create(params);
    if (wechat) {
      let apiConfig = new ApiConfig(wechat.token, wechat.appId, wechat.appSecret, wechat.encrypt, wechat.encodingAesKey)
      ApiConfigKit.putApiConfig(apiConfig);
    }
    return wechat;
  }

  async findAll(userId: string): Promise<Wechat[]> {
    return await this.wechatModel.find().where({ userId: userId }).exec();
  }

  async findAllToInit() {
    return await this.wechatModel.find();
  }

  async remove(id: string) {
    return await this.wechatModel.findByIdAndRemove(id);
  }

  async findById(id: string) {
    return await this.wechatModel.findById(id);
  }

  async syncWechat(wechatId: string) {
    // 切换微信公众号
    let wechat = await this.wechatModel.findById(wechatId);
    ApiConfigKit.setCurrentAppId(wechat.appId);
    // 同步用户标签
    let getTagsRuslt = await TagApi.get();
    // 获取微信用户标签
    let tags = JSON.parse(getTagsRuslt).tags;
    // 获取数据库已存在标签
    let dbTags = await this.usersTagsService.getUsersTags(wechatId);
    //对比
    tags.map((tag)=>{
      let isHasSame = false;
      for(let i = 0; i < dbTags.length; i++){
        if (tag.id === dbTags[i].id) {
          isHasSame = true;
          break;
        }
      }
      console.log(tag);
      if(isHasSame){
        // 数据库有相同 tag ，更新数据库对应tag
        this.usersTagsService.update(tag);
      }else{
        // 数据库没有，则插入新的
        tag.wechatId = wechatId;
        this.usersTagsService.create(tag);
      }
    })
    // 获取关注公众号用户openid列表
    let res = await UserApi.getFollowers('');
    res = JSON.parse(res);
    if (res && res.data && res.data.openid) {
      let openids = res.data.openid;
      for (let n = 0; n < openids.length; n++) {
        // 查数据库有没有当前用户
        let user = await this.userService.findByOpenId(openids[n]);
        // 没有该用户，创建
        if (!user) {
          // 获取用户信息
          let user = await UserApi.getUserInfo(openids[n], 'zh_CN');
          if (user) {
            user = JSON.parse(user);
            user.wechatId = wechat.id;
            this.userService.createUser(user);
          }
        }else{
          // 已该用户，更新
          let _user = await UserApi.getUserInfo(openids[n], 'zh_CN');
          this.userService.update(_user);
        }
      }
      // 获取黑名单 openid列表
      let getBackRes = await UserApi.getBlackList();
      getBackRes = JSON.parse(getBackRes);
      if (getBackRes && getBackRes.data && getBackRes.data.openid) {
        let openids = res.data.openid;
        for (let n = 0; n < openids.length; n++) {
          // 查数据库有没有当前用户
          let user = await this.userService.findByOpenId(openids[n]);
          // 没有该用户，创建
          if (!user) {
            // 获取用户信息
            let user = await UserApi.getUserInfo(openids[n], 'zh_CN');
            if (user) {
              user = JSON.parse(user);
              user.wechatId = wechat.id;
              user.status = 2;
              this.userService.createUser(user);
            }
          }else{
            // 已该用户，更新
            let _user = await UserApi.getUserInfo(openids[n], 'zh_CN');
            _user.status = 2;
            this.userService.update(_user);
          }
        }
      }
      return true;
    }
    
  }

  // 创建用户标签
  async createUseTag(wechatId: string, name: string){
    let wechat = await this.wechatModel.findById(wechatId);
    ApiConfigKit.setCurrentAppId(wechat.appId);
    // 调用微信接口添加标签
    let res = await TagApi.create(name);
    res = JSON.parse(res)
    // 微信接口添加成功后本地数据库添加
    if(res.tag){
      let tag= res.tag;
      tag.wechatId = wechatId;
      tag.count = 0;
      let _tag = await this.usersTagsService.create(tag);
      return _tag;
    }else{
      // 微信接口添加失败则 抛出微信报错
      throw new Error(res.errmsg);
    }
  }
  
  // 更新用户备注
  async updateUserRemark(remark: string, userId: string){
    let user = await this.userService.findById(userId);
    let wechat = await this.wechatModel.findById(user.wechatId);
    ApiConfigKit.setCurrentAppId(wechat.appId);
    // 微信接口更新用户备注
    let result = await UserApi.updateRemark(user.openid,remark);
    result = JSON.parse(result);
    // 微信更新成功后再把本地对应数据更新
    if (result.errmsg == 'ok') {
      let res = await this.userService.update({ id: userId, remark: remark });
      if(res.ok === 1){
        return  true
      }
    }else{
      throw new Error(result.errmsg)
    }
  }

  // 更新用户标签
  async updateUserTag(tagid_list: number[], userId: string){
    let user = await this.userService.findById(userId)
    let wechat = await this.wechatModel.findById(user.wechatId)
    ApiConfigKit.setCurrentAppId(wechat.appId);
    let deleteTags=[];
    let addTags=[];

    // 获取需要删除的标签
    user.tagid_list.map((tag)=>{
      let unfind = true;
      for (let i = 0; i < tagid_list.length; i++) {
        if (tag === tagid_list[i]) {
          unfind = false
          break
        }
      }
      if (unfind){
        deleteTags.push(tag)
      }
    })
  
    // 获取需要添加的标签
    tagid_list.map((tag) => {
      let isHas = false;
      for (let i = 0; i < user.tagid_list.length; i++) {
        if (tag === user.tagid_list[i]) {
          isHas = true
          break
        }
      }
      if (!isHas){
        addTags.push(tag)
      }
    })
    
    if (deleteTags.length > 0) {
      deleteTags.map((tag) => {
        TagApi.batchDelTag(tag,[user.openid]);
        this.usersTagsService.update({ id: tag, $inc: { count: -1 } } )
      })
    }
    if (addTags.length > 0) {
      addTags.map((tag) => {
        TagApi.batchAddTag(tag,[user.openid])
        this.usersTagsService.update({ id: tag, $inc: { count: 1 } } )
      })
    }
    let res = await this.userService.update({ id: userId, tagid_list: tagid_list });
    if(res.ok === 1){
      return  true
    } else {
      console.log(res)
    }
  }
}
