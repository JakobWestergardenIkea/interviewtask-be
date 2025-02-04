import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  colours: string[];

  @Prop({ required: true, default: Date.now })
  createdTime: Date;

  _id: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);