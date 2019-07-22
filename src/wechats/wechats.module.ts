import { Module } from '@nestjs/common';
import { WechatsResolver } from './wechats.resolver'
import { MongooseModule } from '@nestjs/mongoose';
import { WechatSchema } from './wechats.schema';
import { WechatsService } from './wechats.service';
 
@Module({
  imports:[MongooseModule.forFeature([{ name: 'Wechat', schema: WechatSchema }])],
  providers: [WechatsResolver,WechatsService]
})
export class WechatsModule {}
