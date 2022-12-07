export type Driver = {
    _id: string;
    name: string;
    status: boolean;
    orderid?: string;
}

export type NewDriver = {
    name: string;
    status: boolean;
}

export type DriverValidation = {
    user: boolean;
}