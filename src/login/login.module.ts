// login/login.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { loginProviders } from './login.providers';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
  imports: [DatabaseModule], // 这里导入进来
  controllers: [LoginController],
  providers: [...loginProviders, LoginService],
})
export class LoginModule {}