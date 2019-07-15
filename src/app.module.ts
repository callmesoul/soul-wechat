import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot({
    installSubscriptionHandlers: true,
    autoSchemaFile: 'schema.gql',
  })],
  controllers: [AppController],
  providers: [AppService,]
})
export class AppModule {}
