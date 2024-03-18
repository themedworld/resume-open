import { Test, TestingModule } from '@nestjs/testing';
import { ResSetController } from './res-set.controller';
import { ResSetService } from './res-set.service';

describe('ResSetController', () => {
  let controller: ResSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResSetController],
      providers: [ResSetService],
    }).compile();

    controller = module.get<ResSetController>(ResSetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
