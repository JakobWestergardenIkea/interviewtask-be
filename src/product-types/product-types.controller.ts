import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductType } from './product-type.schema';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post()
  async create(
    @Body() createProductTypeDto: CreateProductTypeDto,
  ): Promise<ProductType> {
    return this.productTypesService.create(createProductTypeDto);
  }

  @Get()
  async findAll(): Promise<ProductType[]> {
    return this.productTypesService.findAll();
  }
}
