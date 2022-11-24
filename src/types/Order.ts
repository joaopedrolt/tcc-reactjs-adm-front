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
    cepin: string;
    addressout: string;
    cepout: string;
    status: boolean;
    statusdesc: string;
    driver?: Driver;
    truck?: Truck;
}