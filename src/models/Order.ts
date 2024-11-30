import BaseItem from "./interfaces/BaseItem";
import MenuItem from "./MenuItem";
import InventoryItem from "./InventoryItem";
import OrderDict from "./dict-types/OrderDict";
import MenuItemWithQtyDict from "./dict-types/MenuItemWithQtyDict";

export default class Order implements BaseItem {
    private readonly _orderId: string;
    private readonly _cashierId: string;
    private readonly _month: number;
    private readonly _week: number;
    private readonly _day: number;
    private readonly _hour: number;
    private readonly _menuItems: Map<MenuItem, number>;
    private readonly _inventoryItems: InventoryItem[];
    private readonly _price: number;

    static fromDict(dict: OrderDict): Order {
        const order = new Order(
            dict.orderId,
            dict.cashierId,
            dict.month,
            dict.week,
            dict.day,
            dict.hour,
            dict.price
        );
        dict.menuItemsWithQty
            .sort((a, b) => a.menuItem.itemName.localeCompare(b.menuItem.itemName))
            .forEach((itemWithQty: MenuItemWithQtyDict) => {
                order.addMenuItem(MenuItem.fromDict(itemWithQty.menuItem), itemWithQty.quantity);
            });
        return order;
    }

    constructor(
        orderId: string,
        cashierId: string,
        month: number,
        week: number,
        day: number,
        hour: number,
        price: number,
    ) {
        this._orderId = orderId;
        this._cashierId = cashierId;
        this._orderId = orderId;
        this._month = month;
        this._week = week;
        this._day = day;
        this._hour = hour;
        this._price = price;
        this._menuItems = new Map<MenuItem, number>();
        this._inventoryItems = [];
    }

    get id() {
        return this._orderId;
    }

    get orderId(): string {
        return this._orderId;
    }

    get cashierId() {
        return this._cashierId;
    }

    get month() {
        return this._month;
    }

    get week() {
        return this._week;
    }

    get day() {
        return this._day;
    }

    get hour() {
        return this._hour;
    }

    get price() {
        return this._price;
    }

    get menuItems() {
        return this._menuItems;
    }

    addMenuItem(menuItem: MenuItem, qty: number = 1) {
        this._menuItems.set(menuItem, qty);
    }

    get inventoryItems() {
        return this._inventoryItems;
    }

    addInventoryItem(inventoryItem: InventoryItem) {
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
            menuItemsWithQty: Array.from(
                this._menuItems,
                ([item, qty]: [MenuItem, number]): MenuItemWithQtyDict => (
                    { menuItem: item.toDict(), quantity: qty }
                )
            )
        };
    }
}