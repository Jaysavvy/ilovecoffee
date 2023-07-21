import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity/flavor.entity';

@Module({
        imports: [TypeOrmModule.forFeature([Coffee, FlavorEntity])], 
        controllers: [CoffeesController], 
        providers: [CoffeesService]
    })

export class CoffeesModule {}
