import BaseApi from "./base-api";

export type XZReportData = {
    ordersByHour: number[],
    salesByHour: number[]
};

export default class OrderApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("order");
    }

    async getXReport(): Promise<XZReportData> {
        const response = await this.apiClient.get<XZReportData>("xz-report", {
            params: { wholeDay: false }
        });
        return response.data;
    }

    async getZReport(): Promise<XZReportData> {
        const response = await this.apiClient.get<XZReportData>("xz-report", {
            params: { wholeDay: true }
        })
        return response.data;
    }
}
