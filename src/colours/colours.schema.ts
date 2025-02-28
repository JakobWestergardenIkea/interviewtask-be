import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Colour extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  hexCode: string;
}

export const ColourSchema = SchemaFactory.createForClass(Colour);
