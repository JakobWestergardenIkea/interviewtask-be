import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './product.schema';
import { Colour, ColourSchema } from '../colours/colours.schema';
import {
  ProductType,
  ProductTypeSchema,
} from '../product-types/product-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Colour.name, schema: ColourSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
