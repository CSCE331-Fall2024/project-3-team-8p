import BaseApi from "./base-api";
import XOrZReportDict from "../models/dict-types/XOrZReportDict";
import Order from "../models/Order";

export default class OrderApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("order");
    }

    async addOrder(order: Order): Promise<void> {
        await this.apiClient.post("", order.toDict());
    }

    async getXReport(): Promise<XOrZReportDict> {
        const response = await this.apiClient.get<XOrZReportDict>("report", {
            params: { wholeDay: false }
        });
        return response.data;
    }

    async getZReport(): Promise<XOrZReportDict> {
        const response = await this.apiClient.get<XOrZReportDict>("report", {
            params: { wholeDay: true }
        })
        return response.data;
    }
}
