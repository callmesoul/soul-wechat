import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenApiService } from './access-token-api.service';

describe('AccessTokenApiService', () => {
  let service: AccessTokenApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessTokenApiService],
    }).compile();

    service = module.get<AccessTokenApiService>(AccessTokenApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
