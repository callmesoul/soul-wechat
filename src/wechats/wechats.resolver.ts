import { Resolver,Query, Mutation, Args } from '@nestjs/graphql'
import { WechatsService } from './wechats.service'
import { WechatType } from './dto/create-wechat.dto';
import { WechatInput } from './inputs/wechat.input';
import { Request, UseGuards } from '@nestjs/common';
import { User as CurrentUser } from '../user.decorator';
import { GqlGuard } from '../gql.guard';
import { AccessTokenApi, ApiConfigKit } from 'tnw'
import { UserTagType } from '../users-tags/dto/user-tag.dto';
import { Int } from 'type-graphql';
const uuidv1 = require('uuid/v1');


@Resolver()
export class WechatsResolver {
  constructor(
    private readonly wechatsService: WechatsService,
  ) {}

  @UseGuards(GqlGuard)
  @Query(()=>[WechatType])
  async wechats(@CurrentUser() user: any){
    if(user){
      return await this.wechatsService.findAll(user._id);
    }else{
      throw new Error('你没有权限');
    }
  }
  
  @UseGuards(GqlGuard)
  @Mutation(()=>WechatType)
  async createWechat(@Args('input') input: WechatInput, @CurrentUser() user: any){
      let data:any=input;
      data.userId=user._id;
      data.token=uuidv1();
      if(data.encrypt){
        data.encodingAesKey = uuidv1();
      }else{
        data.encodingAesKey = '';
      }
      return await this.wechatsService.create(data);
  }

  @UseGuards(GqlGuard)
  @Mutation(()=>Boolean)
  async removeWechat(@Args('id') id: string, @CurrentUser() user: any){
      let result = await this.wechatsService.remove(id);
      if(result){
        return true;
      }else{
        throw new Error('删除失败，请稍后再试');
      }
  }

  
  @Mutation(()=>Boolean)
  async checkBindStatus(@Args('wechatId') wechatId: string){
      let wechat = await this.wechatsService.findById(wechatId);
      ApiConfigKit.setCurrentAppId(wechat.appId);
      let result = await AccessTokenApi.getAccessToken();
      result=JSON.parse(result.json);
      if(result.access_token){
        this.wechatsService.syncWechat(wechatId);
        return true;
      }else{
        throw new Error(result.errmsg);
      }
  }

  // 微信同步
  @Mutation(()=>Boolean)
  async syncWechat(@Args('wechatId') wechatId: string){
    return await this.wechatsService.syncWechat(wechatId);
  }

  // 创建用户标签
  @Mutation(()=>UserTagType)
  async createUseTag(
    @Args('wechatId') wechatId: string,
    @Args('name') name: string
  ){
    return await this.wechatsService.createUseTag(wechatId,name);
  }

  // 修改用户备注
  @Mutation(() => Boolean)
  async updateUserRemark(
    @Args('remark') remark: string,
    @Args('userId') userId: string
  ){
    return await this.wechatsService.updateUserRemark(remark,userId);
  }

  // 修改用户标签
  @Mutation(() => Boolean)
  async updateUserTag(
    @Args({ name: 'tagid_list', type: () => [Int], nullable: true, defaultValue: []}) tagid_list: number[],
    @Args('userId') userId: string
  ){
    return await this.wechatsService.updateUserTag(tagid_list,userId);
  }
}