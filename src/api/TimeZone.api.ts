class TimeZone {
    constructor() { }

    private base: string = "http://worldtimeapi.org/api/timezone/"

    public async getSPTimeZone() {

        let sp = "America/Sao_Paulo";

        let response;
        response = await fetch(this.base + sp);

        return response.json();

    }
}

export default TimeZone;