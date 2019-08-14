import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { WechatsModule } from './wechats/wechats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admins/admins.module';
import { AccessTokenApiService } from './access-token-api/access-token-api.service';
import { MsgController } from './msg/msg.controller';
import { UsersTagsModule } from './users-tags/users-tags.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/soul-wechat'),
    CatsModule,
    WechatsModule,
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
    }),
    AdminModule,
    UsersTagsModule
],
  controllers: [AppController, MsgController],
  providers: [AppService, AccessTokenApiService]
})
export class AppModule {}
