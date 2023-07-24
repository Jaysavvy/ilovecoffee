import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlavorEntity } from "./flavor.entity/flavor.entity";

@Entity() //sql table === 'coffees'
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column()
    brand: string;

    @Column({default: 0})
    recommendations: number;

    @JoinTable()
    @ManyToMany(type => FlavorEntity, 
        (flavor) => flavor.coffees,
        {
            cascade: true, // ['insert']
        }

        ) 
        flavors: FlavorEntity[]
}

