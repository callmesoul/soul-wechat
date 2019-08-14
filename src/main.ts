import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlFilter } from './gql.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GqlFilter())
  await app.listen(3000);
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
}
bootstrap();
