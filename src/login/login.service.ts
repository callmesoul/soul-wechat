import { Injectable, Inject } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from './login.entity';

@Injectable()
export class LoginService {
  constructor(
    // Token要对应
    @Inject('LoginRepositoryToken')
    private readonly loginRepository: MongoRepository<User>,
  ) {}
  // 数据库的操作交给service来提供
  async findAll(): Promise<User[]> {
    return await this.loginRepository.find();
  }
}