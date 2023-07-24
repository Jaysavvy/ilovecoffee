import { Coffee } from './entities/coffee.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { FlavorEntity } from './entities/flavor.entity/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
export {};
export declare class CoffeesService {
    private readonly coffeeRepository;
    private readonly flavorRepository;
    private readonly DataSource;
    constructor(coffeeRepository: Repository<Coffee>, flavorRepository: Repository<FlavorEntity>, DataSource: DataSource);
    findAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]>;
    findOneOrFail({ id: id }: {
        id: any;
    }): Promise<Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove({ id: id }: {
        id: any;
    }): Promise<Coffee>;
    recommendCoffee(coffee: Coffee): Promise<void>;
    private preloadFlavorByName;
}
