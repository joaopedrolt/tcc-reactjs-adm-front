class Api {
    constructor() {}

    private base: string = "http://10.158.0.2:3000/api/"

    public getBase(): string {
        return this.base;
    }
}

export default Api;