import { Test, TestingModule } from '@nestjs/testing';
import { CusSecService } from './cus-sec.service';

describe('CusSecService', () => {
  let service: CusSecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CusSecService],
    }).compile();

    service = module.get<CusSecService>(CusSecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
