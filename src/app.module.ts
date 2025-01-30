import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ColoursModule } from './colours/colours.module';
import { ProductTypesModule } from './product-types/product-types.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ProductsModule,
    ColoursModule,
    ProductTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
