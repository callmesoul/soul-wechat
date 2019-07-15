import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    // Token可以自己设定
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
  },
];