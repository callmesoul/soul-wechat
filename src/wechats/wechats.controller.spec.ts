import { Test, TestingModule } from '@nestjs/testing';
import { WechatsController } from './wechats.controller';

describe('Wechats Controller', () => {
  let controller: WechatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WechatsController],
    }).compile();

    controller = module.get<WechatsController>(WechatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
