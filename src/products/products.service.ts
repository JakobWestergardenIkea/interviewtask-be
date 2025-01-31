import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Colour } from '../colours/colours.schema';
import { isValidObjectId } from 'mongoose';
import { ObjectId } from 'bson';
import { ProductType } from '../product-types/product-type.schema';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Colour.name) private coloursModel: Model<Colour>,
    @InjectModel(ProductType.name) private productTypeModel: Model<ProductType>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { colourIds, typeId, name } = createProductDto;
    if (!isValidObjectId(typeId)) {
      throw new NotFoundException(`ID ${typeId} is not a valid ID`);
    }
    const typeObjectId = new ObjectId(typeId);
    const productType = await this.productTypeModel.findById(typeObjectId);
    if (!productType) {
      throw new NotFoundException(`Product type with ID ${typeId} not found`);
    }
    for (const colourId of colourIds) {
      if (!isValidObjectId(colourId)) {
        throw new NotFoundException(`ID ${colourId} is not a valid ID`);
      }
    }
    const colourObjectIds = colourIds.map((id) => {
      return new ObjectId(id);
    });
    if (colourObjectIds.length !== colourIds.length) {
      throw new NotFoundException('Some colour IDs are invalid');
    }
    const colours = await this.coloursModel.find({
      _id: { $in: colourObjectIds },
    });
    return await this.productModel.create({
      name,
      colours: colours.map((colour) => colour.name),
      type: productType.name,
    });
  }

  async findAll(): Promise<{ id: string; name: string }[]> {
    const products = await this.productModel.find().exec();
    return products.map((product) => {
      return { id: product._id.toString(), name: product.name };
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return existingProduct;
  }
}
