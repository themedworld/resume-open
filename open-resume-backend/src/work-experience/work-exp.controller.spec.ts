/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { WorkExpController } from './work-exp.controller';
import { WorkExpService } from './work-exp.service';

describe('WorkExpController', () => {
  let controller: WorkExpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkExpController],
      providers: [WorkExpService],
    }).compile();

    controller = module.get<WorkExpController>(WorkExpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
