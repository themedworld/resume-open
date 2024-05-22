import { Test, TestingModule } from '@nestjs/testing';
import { ResumeimageService } from './resumeimage.service';

describe('ResumeimageService', () => {
  let service: ResumeimageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumeimageService],
    }).compile();

    service = module.get<ResumeimageService>(ResumeimageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
