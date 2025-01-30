import { Controller, Get, Post, Body } from '@nestjs/common';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  async createType(@Body('type') type: string) {
    return this.typesService.createType(type);
  }

  @Get()
  async findAllTypes() {
    return this.typesService.findAllTypes();
  }
}