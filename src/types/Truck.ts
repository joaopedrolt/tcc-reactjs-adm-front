export type Truck = {
    _id: number;
    model: string;
    plateNumber: string;
    axle: string;
    maxcapacity: number;
    status: boolean;
    orderid?: number;
}

export type TruckAdd = { 
    model: string; 
    plateNumber: string;
    axle: string; 
    maxcapacity: number;
}
