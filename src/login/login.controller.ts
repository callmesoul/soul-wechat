import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller()
export class LoginController {
//   constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return '';
  }
}
