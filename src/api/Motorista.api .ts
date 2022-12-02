import { Driver, NewDriver } from "../types/Driver";
import { Order } from "../types/Order";
import { Truck } from "../types/Truck";
import Api from "./ApiClass";

class MotoristaApi extends Api {
    constructor() {
        super()
    }

    private baseApiPath = super.getBase();

    async getDriverOrder(name: string): Promise<Order> {
        const response = await fetch(this.baseApiPath + 'orders/driverorder', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' }
        })
        return response.json();
    }

    async updateOrderDesc(orderUpdateInfo: { orderId: string, statusDesc: string }) {
        await fetch(this.baseApiPath + 'orders/updatedesc', {
            method: 'POST',
            body: JSON.stringify(orderUpdateInfo),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async sumYield(value: number) {
        await fetch(this.baseApiPath + 'dashboard/sum', {
            method: 'POST',
            body: JSON.stringify({ value }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async resetDriver(driver: Driver) {
        await fetch(this.baseApiPath + 'drivers/reset', {
            method: 'POST',
            body: JSON.stringify(driver),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async resetTruck(truck: Truck) {
        await fetch(this.baseApiPath + 'garage/reset', {
            method: 'POST',
            body: JSON.stringify(truck),
            headers: { 'Content-Type': 'application/json' }
        })
    }

}

export default MotoristaApi;