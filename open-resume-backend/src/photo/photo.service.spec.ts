import { Test, TestingModule } from '@nestjs/testing';
import { UploadedFileService  } from './photo.service';

describe('PhotoService', () => {
  let service: UploadedFileService ;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadedFileService ],
    }).compile();

    service = module.get<UploadedFileService >(UploadedFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
