import { HttpException, Injectable, HttpStatus, NotFoundException, Inject, Options } from '@nestjs/common';
import {Coffee} from './entities/coffee.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Connection, DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { FlavorEntity } from './entities/flavor.entity/flavor.entity';
import {PaginationQueryDto} from '../common/dto/pagination-query.dto/pagination-query.dto'
export {};
import { Event } from '../events/entites/event.entity/event.entity'
import { ConfigService } from '@nestjs/config';



@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(FlavorEntity)
        private readonly flavorRepository: Repository<FlavorEntity>,
        private readonly DataSource : DataSource,
        private readonly configService: ConfigService,

    ){
        const databaseHost = this.configService.get<string>('DATABASE_HOST', 'localhost');
        console.log(databaseHost);
    }

    findAll(paginationQuery: PaginationQueryDto){
        const {limit, offset} = paginationQuery;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        })
    }

    async findOneOrFail({id: id}){
        const coffee = await this.coffeeRepository.findOneOrFail({
            where: {id},
            relations: ['flavors']
        });
        
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
            
        }
        return coffee
    }

    async create(createCoffeeDto: CreateCoffeeDto){
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );

        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return this.coffeeRepository.save(coffee)
        
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
    const flavors = 
        updateCoffeeDto.flavors && 
        (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        ));
    
    
        const coffee = await this.coffeeRepository.preload({
        id: +id,
        ...updateCoffeeDto,
        flavors
    });
    if (!coffee){
        throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee)
    }

   async remove({id: id}){
    const coffee = await this.findOneOrFail(id);
    return this.coffeeRepository.remove(coffee)
       
    }


    async recommendCoffee(coffee: Coffee){
        const queryRunner = this.DataSource.createQueryRunner();

        await queryRunner.connect()
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = {coffeeId: coffee.id};

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction()
        } catch(err){
            await queryRunner.commitTransaction();
        }finally{
            await queryRunner.release()
        }
    }

    private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
        const existingFlavor = await this.flavorRepository.findOneBy( {name: name} );
        if (existingFlavor){
            return existingFlavor;
        }
        return this.flavorRepository.create({name});

    }
}

