import { Test, TestingModule } from '@nestjs/testing';
import { ResSetService } from './res-set.service';

describe('ResSetService', () => {
  let service: ResSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResSetService],
    }).compile();

    service = module.get<ResSetService>(ResSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
