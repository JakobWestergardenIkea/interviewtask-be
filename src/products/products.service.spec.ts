import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { Colour } from '../colours/colours.schema';
import { ProductType } from '../product-types/product-type.schema';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: Model<Product>;
  let colourModel: Model<Colour>;
  let productTypeModel: Model<ProductType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(Colour.name),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getModelToken(ProductType.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
    colourModel = module.get<Model<Colour>>(getModelToken(Colour.name));
    productTypeModel = module.get<Model<ProductType>>(
      getModelToken(ProductType.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let createProductDto: CreateProductDto;
    beforeEach(() => {
      createProductDto = {
        name: 'Test Product',
        colourIds: ['607f1f77bcf86cd799439011', '607f1f77bcf86cd799439012'],
        typeId: '607f1f77bcf86cd799439013',
      };
    });

    it('should create a product successfully', async () => {
      jest.spyOn(productTypeModel, 'findById').mockResolvedValue({
        _id: '607f1f77bcf86cd799439013',
        name: 'Furniture',
      } as any);

      jest.spyOn(colourModel, 'find').mockResolvedValue([
        { _id: '607f1f77bcf86cd799439011', name: 'Red' },
        { _id: '607f1f77bcf86cd799439012', name: 'Blue' },
      ] as unknown as Colour[]);

      const createdProduct = {
        _id: '607f1f77bcf86cd799439014',
        name: 'Test Product',
        colours: ['Red', 'Blue'],
        type: 'Furniture',
        createdTime: new Date(),
      };

      jest
        .spyOn(productModel, 'create')
        .mockResolvedValue(createdProduct as any);

      const result = await service.create(createProductDto);
      expect(result).toEqual(createdProduct);
    });

    it('should throw NotFoundException if product type is not found', async () => {
      jest.spyOn(productTypeModel, 'findById').mockResolvedValue(null);

      await expect(service.create(createProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if colour ID is not valid', async () => {
      createProductDto.colourIds = ['invalid_id'];

      await expect(service.create(createProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
