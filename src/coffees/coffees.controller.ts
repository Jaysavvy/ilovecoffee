import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import {PaginationQueryDto} from '../common/dto/pagination-query.dto/pagination-query.dto'


@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService){

  }
   
@Get()
findAll(@Query() paginationQuery: PaginationQueryDto){
  //const {limit, offset} = paginationQuery;
  return this.coffeesService.findAll(paginationQuery);
  
  }

@Get(':id')
findOneOrFail(@Param('id') id: number){
  return this.coffeesService.findOneOrFail({id :id})
  }

  @Post()
  create(@Body() CreateCoffeeDto: CreateCoffeeDto){
    return this.coffeesService.create(CreateCoffeeDto)
    // return This action creates a coffee
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateCoffeeDto: UpdateCoffeeDto){
    return this.coffeesService.update(id, UpdateCoffeeDto)
    
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.coffeesService.remove({id :id})
  }
}
