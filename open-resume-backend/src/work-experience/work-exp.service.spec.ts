import { Test, TestingModule } from '@nestjs/testing';
import { WorkExpService } from './work-exp.service';

describe('WorkExpService', () => {
  let service: WorkExpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkExpService],
    }).compile();

    service = module.get<WorkExpService>(WorkExpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
