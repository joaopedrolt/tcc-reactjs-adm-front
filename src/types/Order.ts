import { Driver } from "./Driver";
import { Truck } from "./Truck";

export type Order = {
    _id: number;
    desc: string;
    size: number;
    weight: number;
    amount: number;
    container: number;
    addressin: string;
    addressout: string;
    status: boolean;
    driver?: Driver;
    truck?: Truck;
}