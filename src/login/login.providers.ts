import { Connection, getMongoRepository } from 'typeorm';
import { User } from './login.entity';

export const loginProviders = [
  {
    // Token可以自己设定
    provide: 'LoginRepositoryToken',
    // User是entity定义的数据实体
    useFactory: (connection: Connection) => connection.getMongoRepository(User), 
    inject: ['DbConnectionToken'],
  },
];