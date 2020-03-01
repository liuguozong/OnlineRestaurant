import { Test, TestingModule } from '@nestjs/testing';
import { DetailedsController } from './detaileds.controller';

describe('Detaileds Controller', () => {
  let controller: DetailedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailedsController],
    }).compile();

    controller = module.get<DetailedsController>(DetailedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
