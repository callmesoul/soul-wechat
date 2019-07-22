import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver'
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';
 
@Module({
  imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserResolver,UsersService]
})
export class UsersModule {}
