import { FlavorEntity } from "./flavor.entity/flavor.entity";
export declare class Coffee {
    id: number;
    name: string;
    description: string;
    brand: string;
    recommendations: number;
    flavors: FlavorEntity[];
}
