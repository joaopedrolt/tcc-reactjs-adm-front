import { Driver } from "../types/Driver";
import { GlDashBoardDto } from "../types/GlDashBoard";
import { Order } from "../types/Order";
import { Truck, TruckAdd } from "../types/Truck";
import Api from "./ApiClass.api";

class GlApi extends Api {
    constructor() {
        super()
    }

    private baseApiPath = super.getBase();

    async getGarage(): Promise<Truck[]> {
        const response = await fetch(this.baseApiPath + 'garage');
        return response.json();
    }

    async getOrders(): Promise<Order[]> {
        const response = await fetch(this.baseApiPath + 'orders');
        return response.json();
    }

    async getOrderByID(id: string): Promise<Order> {
        const response = await fetch(this.baseApiPath + 'orders/' + id);
        return response.json();
    }

    async getDrivers(): Promise<Driver[]> {
        const response = await fetch(this.baseApiPath + 'drivers');
        return response.json();
    }

    async getGlDashBoard(): Promise<GlDashBoardDto[]> {
        const response = await fetch(this.baseApiPath + 'dashboard');
        return response.json();
    }

    async getAvailibleDrivers(): Promise<Driver[]> {
        const response = await fetch(this.baseApiPath + 'drivers/avaliable');
        return response.json();
    }

    async getAvailibleTrucks(): Promise<Truck[]> {
        const response = await fetch(this.baseApiPath + 'garage/avaliable');
        return response.json();
    }

    async postNewTruck(data: TruckAdd) {
        let response = await fetch(this.baseApiPath + 'garage/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json();
    }

    async postDeleteTruck(_id: string) {
        let response = await fetch(this.baseApiPath + 'garage/delete', {
            method: 'POST',
            body: JSON.stringify({ _id }),
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json();
    }

    async updateOrder(_id: string, driver: Driver, truck: Truck) {
        await fetch(this.baseApiPath + 'orders/update/' + _id, {
            method: 'PATCH',
            body: JSON.stringify({ driver, truck }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async updateDriver(driver: Driver) {
        await fetch(this.baseApiPath + 'drivers/update', {
            method: 'POST',
            body: JSON.stringify(driver),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async updateTruck(truck: Truck) {
        await fetch(this.baseApiPath + 'garage/update', {
            method: 'POST',
            body: JSON.stringify(truck),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async acceptOrder(orderId: string, accepted: boolean) {
        await fetch(this.baseApiPath + 'orders/accept', {
            method: 'POST',
            body: JSON.stringify({ orderId, accepted }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

}

export default GlApi;