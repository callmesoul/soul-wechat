import { Module } from '@nestjs/common';
import { WechatsResolver } from './wechats.resolver'
import { MongooseModule } from '@nestjs/mongoose';
import { WechatSchema } from './wechats.schema';
import { WechatsService } from './wechats.service';
import { WechatsController } from './wechats.controller';
import { UsersModule } from '../users/users.module';
import { UsersTagsModule } from '../users-tags/users-tags.module';
 
@Module({
  imports:
  [
    MongooseModule.forFeature([{ name: 'Wechat', schema: WechatSchema }]),
    UsersModule,
    UsersTagsModule
  ],
  providers: [WechatsResolver,WechatsService],
  controllers: [WechatsController],
  exports:[WechatsService]
})
export class WechatsModule {}
