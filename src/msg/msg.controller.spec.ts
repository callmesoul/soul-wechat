import { Test, TestingModule } from '@nestjs/testing';
import { MsgController } from './msg.controller';

describe('Msg Controller', () => {
  let controller: MsgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsgController],
    }).compile();

    controller = module.get<MsgController>(MsgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
