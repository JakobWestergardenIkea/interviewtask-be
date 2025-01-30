import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Colour } from './colours.schema';
import { CreateColourDto } from './dto/create-colour.dto';

@Injectable()
export class ColoursService {
  constructor(@InjectModel(Colour.name) private coloursModel: Model<Colour>) {}

  async create(createColourDto: CreateColourDto): Promise<Colour> {
    const createdColour = new this.coloursModel(createColourDto);
    return createdColour.save();
  }

  async findAll(): Promise<Colour[]> {
    return this.coloursModel.find().exec();
  }
}
