import BaseItem from "./interfaces/BaseItem";
import MenuItem from "./MenuItem";
import InventoryItem from "./InventoryItem";
import OrderDict from "./dict-types/OrderDict";
import OrderStatus from "./enums/OrderStatus";

export default class Order implements BaseItem {
    private readonly _orderId: string;
    private readonly _cashierId: string;
    private readonly _month: number;
    private readonly _week: number;
    private readonly _day: number;
    private readonly _hour: number;
    private readonly _menuItems: Map<MenuItem, number>;
    private readonly _inventoryItems: InventoryItem[];
    private _price: number;
    private _status: OrderStatus;

    static fromDict(dict: OrderDict): Order {
        return new Order(
            dict.orderId,
            dict.cashierId,
            dict.month,
            dict.week,
            dict.day,
            dict.hour,
            dict.price,
            dict.status
        );
    }

    constructor(
        orderId: string,
        cashierId: string,
        month: number,
        week: number,
        day: number,
        hour: number,
        price: number,
        status: OrderStatus,
    ) {
        this._orderId = orderId;
        this._cashierId = cashierId;
        this._orderId = orderId;
        this._month = month;
        this._week = week;
        this._day = day;
        this._hour = hour;
        this._price = price;
        this._status = status;
        this._menuItems = new Map<MenuItem, number>();
        this._inventoryItems = [];
    }

    get id(): string {
        return this._orderId;
    }

    get cashierId(): string {
        return this._cashierId;
    }

    get month(): number {
        return this._month;
    }

    get week(): number {
        return this._week;
    }

    get day(): number {
        return this._day;
    }

    get hour(): number {
        return this._hour;
    }

    get price(): number {
        return this._price;
    }

    get status(): OrderStatus {
        return this._status;
    }

    set status(value: OrderStatus) {
        this._status = value;
    }

    get menuItems(): Map<MenuItem, number> {
        return this._menuItems;
    }

    addOrUpdateMenuItem(menuItem: MenuItem, qty: number = 1): void {
        // Update the order price
        // by determining the difference in qty for the menu item
        const oldQty: number = this.menuItems.get(menuItem) ?? 0;
        let qtyDiff: number = qty - oldQty;
        this._price += qtyDiff * menuItem.price;

        this._menuItems.set(menuItem, qty);
    }

    get inventoryItems(): InventoryItem[] {
        return this._inventoryItems;
    }

    addInventoryItem(inventoryItem: InventoryItem): void {
        this._inventoryItems.push(inventoryItem);
    }
    
    toDict(): OrderDict {
        return {
            orderId: this._orderId,
            cashierId: this._cashierId,
            month: this._month,
            week: this._week,
            day: this._day,
            hour: this._hour,
            price: this._price,
            status: this._status,
        };
    }
}