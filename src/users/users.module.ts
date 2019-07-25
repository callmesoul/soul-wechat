import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),

  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}