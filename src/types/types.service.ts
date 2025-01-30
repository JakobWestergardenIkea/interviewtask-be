import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type } from './type.schema';

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  async createType(type: string): Promise<Type> {
    const newType = new this.typeModel({ type });
    return newType.save();
  }

  async findAllTypes(): Promise<Type[]> {
    return this.typeModel.find().exec();
  }
}