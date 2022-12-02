import { OrderAdd } from "../types/Order";
import Api from "./ApiClass";

class Customer extends Api {
    constructor() {
        super()
    }

    private baseApiPath = super.getBase();

    async getAddress(cep: string) {
        const response = await fetch(this.baseApiPath + 'customers/address/' + cep);
        return response.json();
    }

    async postNewTruck(order: OrderAdd) {
        await fetch(this.baseApiPath + 'orders/add', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json' }
        })
    }

}

export default Customer;