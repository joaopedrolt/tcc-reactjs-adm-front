export type Truck = {
    _id: string;
    model: string;
    plateNumber: string;
    axle: string;
    maxcapacity: number;
    status: boolean;
    orderid?: string;
}

export type TruckAdd = { 
    model: string; 
    plateNumber: string;
    axle: string; 
    maxcapacity: number;
}

export type TruckValidation = {
    model: boolean;
    plateNumber: boolean;
}