import { Test, TestingModule } from '@nestjs/testing';
import { PerInfController } from './per-inf.controller';
import { PerInfService } from './per-inf.service';

describe('PerInfController', () => {
  let controller: PerInfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerInfController],
      providers: [PerInfService],
    }).compile();

    controller = module.get<PerInfController>(PerInfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
