import BaseApi from "./base-api";
import XOrZReportDict from "../models/dict-types/XOrZReportDict";

export default class OrderApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("order");
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
