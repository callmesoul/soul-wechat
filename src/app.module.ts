import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { WechatsModule } from './wechats/wechats.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/soul-wechat'),
    CatsModule,
    UsersModule,
    WechatsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
  })
],
  controllers: [AppController],
  providers: [AppService,]
})
export class AppModule {}
