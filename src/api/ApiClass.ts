class Api {
    constructor() {}

    private base: string = "http://34.151.229.81:3000/api/"
    private baseLocal: string = "http://localhost:3000/api/"

    public getBase(): string {
        return this.base;
    }
}

export default Api;