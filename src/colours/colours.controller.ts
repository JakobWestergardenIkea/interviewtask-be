import { Controller, Get, Post, Body } from '@nestjs/common';
import { ColoursService } from './colours.service';
import { CreateColourDto } from './dto/create-colour.dto';

@Controller('colours')
export class ColoursController {
  constructor(private readonly coloursService: ColoursService) {}

  @Post()
  create(@Body() createColourDto: CreateColourDto) {
    return this.coloursService.create(createColourDto);
  }

  @Get()
  findAll() {
    return this.coloursService.findAll();
  }
}
