import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductType extends Document {
  @Prop({ required: true })
  name: string;
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
