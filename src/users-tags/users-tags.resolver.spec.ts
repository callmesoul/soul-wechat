import { Test, TestingModule } from '@nestjs/testing';
import { UsersTagsResolver } from './users-tags.resolver';

describe('UsersTagsResolver', () => {
  let resolver: UsersTagsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersTagsResolver],
    }).compile();

    resolver = module.get<UsersTagsResolver>(UsersTagsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
