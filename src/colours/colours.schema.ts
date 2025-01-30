import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Colour extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  hex: string;
}

export const ColourSchema = SchemaFactory.createForClass(Colour);