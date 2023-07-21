import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlavorEntity } from "./flavor.entity/flavor.entity";

@Entity() //sql table === 'coffees'
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany(type => FlavorEntity, 
        (flavor) => flavor.coffees,
        {
            cascade: true, // ['insert']
        }

        ) 
        flavors: FlavorEntity[]
}

