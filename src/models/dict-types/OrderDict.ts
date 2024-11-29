import OrderStatus from "../enums/OrderStatus";

export default interface OrderDict {
    orderId: string;
    cashierId: string;
    month: number;
    week: number;
    day: number;
    hour: number;
    price: number;
    status: OrderStatus;
}