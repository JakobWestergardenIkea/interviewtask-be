import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductType } from './product-type.schema';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectModel(ProductType.name) private productTypeModel: Model<ProductType>,
  ) {}

  async create(
    createProductTypeDto: CreateProductTypeDto,
  ): Promise<ProductType> {
    const createdProductType = new this.productTypeModel(createProductTypeDto);
    const savedProductType = await createdProductType.save();
    return savedProductType.toObject();
  }

  async findAll(): Promise<ProductType[]> {
    return this.productTypeModel.find().lean().exec();
  }
}