import BaseApi from "./base-api";
import Order from "../models/Order";
import XZReportData from "../models/typedefs/XZReportData";

export default class OrderApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("order");
    }

    async getXReport(): Promise<XZReportData> {
        const response = await this.apiClient.get<XZReportData>("report", {
            params: { wholeDay: false }
        });
        return response.data;
    }

    async getZReport(): Promise<XZReportData> {
        const response = await this.apiClient.get<XZReportData>("report", {
            params: { wholeDay: true }
        })
        return response.data;
    }

    async addOrder(order: Order): Promise<void> {
            const OrderData = {
                orderId: order.orderId,
                cashierId: order.cashierId,
                month: order.month,
                week: order.week,
                day: order.day,
                hour: order.hour,
                price: order.price,
            };
            await this.apiClient.post("", OrderData);
    }

}
