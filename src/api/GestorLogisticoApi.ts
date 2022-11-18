import { Truck } from "../types/Truck";
import Api from "./ApiClass";

class GlApi extends Api {
    constructor() {
        super()
    }

    private baseApiPath = super.getBase();

    async getGarage(): Promise<Truck[]> {
        try {
            let response = await fetch(this.baseApiPath + 'garage');
            return await response.json();
        } catch (error) {
            return [];
        }
    }

}

export default GlApi;