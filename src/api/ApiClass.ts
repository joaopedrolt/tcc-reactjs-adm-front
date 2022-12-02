class Api {
    constructor() {}

    private base: string = "http://192.168.0.103:3000/api/"

    public getBase(): string {
        return this.base;
    }
}

export default Api;