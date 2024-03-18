import { Test, TestingModule } from '@nestjs/testing';
import { CusSecController } from './cus-sec.controller';
import { CusSecService } from './cus-sec.service';

describe('CusSecController', () => {
  let controller: CusSecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CusSecController],
      providers: [CusSecService],
    }).compile();

    controller = module.get<CusSecController>(CusSecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
