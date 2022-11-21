import { TimeZoneType } from "../types/TimeZoneType";

class TimeZone {
    constructor() { }

    private base: string = "http://worldtimeapi.org/api/timezone/"

    private async getSPTimeZone(): Promise<TimeZoneType> {
        const sp = "America/Sao_Paulo";
        const response = await fetch(this.base + sp);
        return response.json();
    }

    public async getSPDate(): Promise<string> {
        const spTimeZone = await this.getSPTimeZone();
        const dataTime = spTimeZone.datetime;

        const day: string = dataTime.substring(8, 10);
        const month: string = dataTime.substring(5, 7);
        const year: string = dataTime.substring(0, 4);

        return day + '/' + month + '/' + year;
    }

}

export default TimeZone;