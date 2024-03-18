import { Test, TestingModule } from '@nestjs/testing';
import { PerInfService } from './per-inf.service';

describe('PerInfService', () => {
  let service: PerInfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerInfService],
    }).compile();

    service = module.get<PerInfService>(PerInfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
