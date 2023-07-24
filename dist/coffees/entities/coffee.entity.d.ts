import { FlavorEntity } from "./flavor.entity/flavor.entity";
export declare class Coffee {
    id: number;
    title: string;
    brand: string;
    recommendations: number;
    flavors: FlavorEntity[];
}
