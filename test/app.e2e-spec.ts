import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { CreateProductDto } from '../src/products/dto/create-product.dto';

const mockCreateProductDto: CreateProductDto = {
  name: 'Test Product',
  colourIds: ['679b8e0f6e0934d1d628f3d8', '679b8e0f6e0934d1d628f3da'],
  typeId: '679b8e0f6e0934d1d628f43e',
};

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (POST) - should create a product successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(mockCreateProductDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Test Product',
        colours: expect.arrayContaining(['Red', 'Blue']),
        type: 'Chair',
        createdTime: expect.any(String),
      }),
    );
  });

  it('/products (POST) - should return 404 if product type is not found', async () => {
    const invalidProductTypeDto: CreateProductDto = {
      name: 'Invalid Product',
      colourIds: ['679b8e0f6e0934d1d628f3d8', '679b8e0f6e0934d1d628f3da'],
      typeId: 'invalidTypeId',
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(invalidProductTypeDto)
      .expect(HttpStatus.NOT_FOUND);

    expect((response.body as { message: string }).message).toBe(
      'ID invalidTypeId is not a valid ID',
    );
  });
});
