"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const coffee_entity_1 = require("./entities/coffee.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flavor_entity_1 = require("./entities/flavor.entity/flavor.entity");
const event_entity_1 = require("../events/entites/event.entity/event.entity");
let CoffeesService = exports.CoffeesService = class CoffeesService {
    constructor(coffeeRepository, flavorRepository, DataSource) {
        this.coffeeRepository = coffeeRepository;
        this.flavorRepository = flavorRepository;
        this.DataSource = DataSource;
    }
    findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }
    async findOneOrFail({ id: id }) {
        const coffee = await this.coffeeRepository.findOneOrFail({
            where: { id },
            relations: ['flavors']
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    async create(createCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)));
        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return this.coffeeRepository.save(coffee);
    }
    async update(id, updateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors &&
            (await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))));
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }
    async remove({ id: id }) {
        const coffee = await this.findOneOrFail(id);
        return this.coffeeRepository.remove(coffee);
    }
    async recommendCoffee(coffee) {
        const queryRunner = this.DataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;
            const recommendEvent = new event_entity_1.Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.commitTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async preloadFlavorByName(name) {
        const existingFlavor = await this.flavorRepository.findOneBy({ name: name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
};
exports.CoffeesService = CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coffee_entity_1.Coffee)),
    __param(1, (0, typeorm_1.InjectRepository)(flavor_entity_1.FlavorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], CoffeesService);
//# sourceMappingURL=coffees.service.js.map