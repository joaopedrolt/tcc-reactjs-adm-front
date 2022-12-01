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
            body: JSON.stringify({name}),
            headers: { 'Content-Type': 'application/json' }
        })
        return response.json();
    }

}

export default MotoristaApi;