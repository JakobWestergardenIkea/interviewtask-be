import { Test, TestingModule } from '@nestjs/testing';
import { TypesService } from './types.service';

describe('TypesService', () => {
  let service: TypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypesService,
        {
          provide: 'TypeModel',//
          useValue: { find: jest.fn(), create: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<TypesService>(TypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
