import { Driver, DriverValidation, NewDriver } from "../types/Driver";
import { GlDashBoardDto } from "../types/GlDashBoard";
import { Order } from "../types/Order";
import { Truck, TruckAdd, TruckValidation } from "../types/Truck";
import { UserAdd } from "../types/User";
import Api from "./ApiClass";

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

    async pushNewCustomerOrder(orderId: string, customerId: string) {
        await fetch(this.baseApiPath + 'customers/pushorder', {
            method: 'POST',
            body: JSON.stringify({ orderId, customerId }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async addDriver(newDriver: NewDriver) {
        await fetch(this.baseApiPath + 'drivers/add', {
            method: 'POST',
            body: JSON.stringify(newDriver),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async removeDriver(param: { id: string }) {
        await fetch(this.baseApiPath + 'drivers/delete', {
            method: 'POST',
            body: JSON.stringify(param),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async removeDriverLogin(param: { name: string }) {
        await fetch(this.baseApiPath + 'users/delete', {
            method: 'POST',
            body: JSON.stringify(param),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async addUser(user: UserAdd) {
        await fetch(this.baseApiPath + 'users/add', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async driverValidation(user: string) : Promise<DriverValidation>  {
        const response = await fetch(this.baseApiPath + 'users/validation', {
            method: 'POST',
            body: JSON.stringify({user}),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Private-Network': 'true'
            }
        })
        return await response.json();
    }

    async truckValidation(model: string, plateNumber: string) : Promise<TruckValidation>  {
        const response = await fetch(this.baseApiPath + 'garage/validation', {
            method: 'POST',
            body: JSON.stringify({model, plateNumber}),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Private-Network': 'true'
            }
        })
        return await response.json();
    }

}

export default GlApi;