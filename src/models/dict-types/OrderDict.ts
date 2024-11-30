import MenuItemWithQtyDict from "./MenuItemWithQtyDict";
import OrderStatus from "../enums/OrderStatus";

export default interface OrderDict {
    orderId: string;
    cashierId: string;
    month: number;
    week: number;
    day: number;
    hour: number;
    price: number;
    menuItemsWithQty: MenuItemWithQtyDict[];
    status: OrderStatus;
}