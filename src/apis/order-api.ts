import BaseApi from "./base-api";
import XOrZReportDict from "../models/dict-types/XOrZReportDict";
import Order from "../models/Order";
import OrderDict from "../models/dict-types/OrderDict";
import OrderStatus from "../models/enums/OrderStatus";

export default class OrderApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("order");
    }

    async addOrder(order: Order): Promise<void> {
        await this.apiClient.post("", order.toDict());
    }

    async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void> {
        await this.apiClient.put(`${orderId}/updateStatus?newStatus=${newStatus}`);
    }

    async getOutstandingOrders(): Promise<Order[]> {
        const response = await this.apiClient.get<OrderDict[]>("undelivered");
        return response.data.map((item: OrderDict) => Order.fromDict(item));
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
