import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Colour } from './colours.schema';
import { CreateColourDto } from './dto/create-colour.dto';
import { UpdateColourDto } from './dto/update-colour.dto';

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

  async findOne(id: string): Promise<Colour> {
    const colour = await this.coloursModel.findById(id).exec();
    if (!colour) {
      throw new NotFoundException(`Colour with ID ${id} not found`);
    }
    return colour;
  }

  async update(id: string, updateColourDto: UpdateColourDto): Promise<Colour> {
    const existingColour = await this.coloursModel
      .findByIdAndUpdate(id, updateColourDto, { new: true })
      .exec();
    if (!existingColour) {
      throw new NotFoundException(`Colour with ID ${id} not found`);
    }
    return existingColour;
  }
}
