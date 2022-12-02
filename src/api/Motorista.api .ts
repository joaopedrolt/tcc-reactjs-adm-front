import { Order } from "../types/Order";
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

}

export default MotoristaApi;