import { Module } from '@nestjs/common';
import { ColoursService } from './colours.service';
import { ColoursController } from './colours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Colour, ColourSchema } from './colours.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Colour.name, schema: ColourSchema }]),
  ],
  controllers: [ColoursController],
  providers: [ColoursService],
})
export class ColoursModule {}
