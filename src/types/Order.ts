import { Driver } from "./Driver";
import { Truck } from "./Truck";

export type Order = {
    _id: string;
    desc: string;
    weight: number;
    addressin: string;
    cepin: string;
    addressout: string;
    cepout: string;
    status: boolean;
    statusdesc: string;
    driver?: Driver;
    truck?: Truck;
    price?: number;
    distance?: string;
    accepted: boolean;
    finished: boolean;
}