import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Type extends Document {
  @Prop({ type: String, required: true })
  type: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);