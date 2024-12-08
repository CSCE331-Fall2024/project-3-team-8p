import BaseApi from "./base-api";
import XOrZReportDict from "../models/dict-types/XOrZReportDict";
import Order from "../models/Order";
import OrderDict from "../models/dict-types/OrderDict";
import OrderStatus from "../models/enums/OrderStatus";

/**
 * API client for order-specific functionality
 */
export default class OrderApi extends BaseApi {
    /**
     * Constructs a new {@linkcode OrderApi} instance
     */
    constructor() {
        super("order");
    }

    /**
     * Adds an order to the backend
     * @async
     * @param order - The order to add
     */
    async addOrder(order: Order): Promise<void> {
        await this.apiClient.post("", order.toDict());
    }

    /**
     * Updates an order's status on the backend
     * @async
     * @param orderId - The order ID of the order to update
     * @param newStatus - The new order status
     */
    async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void> {
        await this.apiClient.put(`${orderId}/updateStatus?newStatus=${newStatus}`);
    }

    /**
     * Gets all outstanding orders from the backend
     * @async
     * @returns A `Promise` containing a list of all outstanding {@linkcode Order}s
     *
     * @remarks An order is considered outstanding if its status is not {@linkcode OrderStatus.DELIVERED}
     */
    async getOutstandingOrders(): Promise<Order[]> {
        const response = await this.apiClient.get<OrderDict[]>("undelivered");
        return response.data.map((item: OrderDict) => Order.fromDict(item));
    }

    /**
     * Gets the X report for the current day
     * @async
     * @returns A `Promise` containing a {@linkcode XOrZReportDict} of information on
     * orders and sales, grouped by hour
     */
    async getXReport(): Promise<XOrZReportDict> {
        const response = await this.apiClient.get<XOrZReportDict>("report", {
            params: { wholeDay: false }
        });
        return response.data;
    }

    /**
     * Gets the Z report for the current day
     * @async
     * @returns A `Promise` containing a {@linkcode XOrZReportDict} of information on orders and sales, grouped by hour
     */
    async getZReport(): Promise<XOrZReportDict> {
        const response = await this.apiClient.get<XOrZReportDict>("report", {
            params: { wholeDay: true }
        })
        return response.data;
    }
}
