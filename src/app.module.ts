import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ColoursModule } from './colours/colours.module';
import { TypesModule } from './types/types.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // Update with your actual MongoDB connection string
    ProductsModule, ColoursModule, TypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}