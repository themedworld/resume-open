import { Test, TestingModule } from '@nestjs/testing';
import { ResumeimageController } from './resumeimage.controller';
import { ResumeimageService } from './resumeimage.service';

describe('ResumeimageController', () => {
  let controller: ResumeimageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeimageController],
      providers: [ResumeimageService],
    }).compile();

    controller = module.get<ResumeimageController>(ResumeimageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
