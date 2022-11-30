class Api {
    constructor() {}

    private base: string = "http://localhost:3000/api/"

    public getBase(): string {
        return this.base;
    }
}

export default Api;