import { Resolver,Query, Mutation, Args } from '@nestjs/graphql'
import { WechatsService } from './wechats.service'
import { WechatType } from './dto/create-wechat.dto';
import { WechatInput } from './inputs/wechat.input';

@Resolver()
export class WechatsResolver {
  constructor(
    private readonly wechatsService: WechatsService,
  ) {}

  @Query(()=>String)
  async hello(){
      return 'hello';
  }

  @Query(()=>[WechatType])
  async cats(){
      return this.wechatsService.findAll();
  }

  @Mutation(()=>WechatType)
  async createCat(@Args('input') input: WechatInput){
      return this.wechatsService.create(input);
  }
}