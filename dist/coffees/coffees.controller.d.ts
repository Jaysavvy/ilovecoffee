import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(paginationQuery: PaginationQueryDto): Promise<import("./entities/coffee.entity").Coffee[]>;
    findOneOrFail(id: number): Promise<import("./entities/coffee.entity").Coffee>;
    create(CreateCoffeeDto: CreateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    update(id: string, UpdateCoffeeDto: UpdateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    remove(id: string): Promise<import("./entities/coffee.entity").Coffee>;
}
