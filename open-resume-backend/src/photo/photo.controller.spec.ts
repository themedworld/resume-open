import { Test, TestingModule } from '@nestjs/testing';
import {UploadedFileController } from './photo.controller';
import {UploadedFileService} from './photo.service';

describe('PhotoController', () => {
  let controller: UploadedFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadedFileController],
      providers: [UploadedFileService],
    }).compile();

    controller = module.get<UploadedFileController>(UploadedFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
