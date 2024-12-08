import MenuItem from "./MenuItem";
import InventoryItem from "./InventoryItem";
import BaseItem from "./interfaces/BaseItem";
import OrderDict from "./dict-types/OrderDict";
import MenuItemWithQtyDict from "./dict-types/MenuItemWithQtyDict";
import OrderStatus from "./enums/OrderStatus";

/**
 * Model for an order
 */
export default class Order implements BaseItem {
    /**
     * The order's ID
     * @private
     */
    private readonly _orderId: string;
    /**
     * The cashier's ID who processed the order
     * @private
     */
    private readonly _cashierId: string;
    /**
     * The month the order was placed
     * @private
     */
    private readonly _month: number;
    /**
     * The week the order was placed
     * @private
     */
    private readonly _week: number;
    /**
     * The day the order was placed
     * @private
     */
    private readonly _day: number;
    /**
     * The hour the order was placed
     * @private
     */
    private readonly _hour: number;
    /**
     * The menu items ordered, mapped by the menu item and quantity
     * @private
     */
    private readonly _menuItems: Map<MenuItem, number>;
    /**
     * The inventory items associated with the order
     * @private
     */
    private readonly _inventoryItems: InventoryItem[];
    /**
     * The total price of the order
     * @private
     */
    private readonly _price: number;
    /**
     * The current status of the order
     * @private
     */
    private _status: OrderStatus;

    /**
     * Maps from an {@linkcode OrderDict} to an {@linkcode Order}
     * @param dict - The {@linkcode OrderDict} containing order data
     * @returns A new {@linkcode Order} instance
     */
    static fromDict(dict: OrderDict): Order {
        const order = new Order(
            dict.orderId,
            dict.cashierId,
            dict.month,
            dict.week,
            dict.day,
            dict.hour,
            dict.price,
            dict.status
        );
        dict.menuItemsWithQty
            .sort((a, b) => a.menuItem.itemName.localeCompare(b.menuItem.itemName))
            .forEach((itemWithQty: MenuItemWithQtyDict) => {
                order.addMenuItem(MenuItem.fromDict(itemWithQty.menuItem), itemWithQty.quantity);
            });
        return order;
    }

    /**
     * Constructs a new {@linkcode Order}
     * @param orderId - The order's ID
     * @param cashierId - The cashier's ID who processed the order
     * @param month - The month the order was placed
     * @param week - The week the order was placed
     * @param day - The day the order was placed
     * @param hour - The hour the order was placed
     * @param price - The total price of the order
     * @param status - The current status of the order
     */
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
        this._menuItems = new Map<MenuItem, number>();
        this._inventoryItems = [];
        this._status = status;
    }

    /**
     * Gets the order's ID
     * @returns The order's ID
     */
    get id(): string {
        return this._orderId;
    }

    /**
     * Gets the order's ID
     * @returns The order's ID
     */
    get orderId(): string {
        return this._orderId;
    }

    /**
     * Gets the cashier's ID who processed the order
     * @returns The cashier's ID
     */
    get cashierId(): string {
        return this._cashierId;
    }

    /**
     * Gets the month the order was placed
     * @returns The month the order was placed
     */
    get month(): number {
        return this._month;
    }

    /**
     * Gets the week the order was placed
     * @returns The week the order was placed
     */
    get week(): number {
        return this._week;
    }

    /**
     * Gets the day the order was placed
     * @returns The day the order was placed
     */
    get day(): number {
        return this._day;
    }

    /**
     * Gets the hour the order was placed
     * @returns The hour the order was placed
     */
    get hour(): number {
        return this._hour;
    }

    /**
     * Gets the total price of the order
     * @returns The total price of the order
     */
    get price(): number {
        return this._price;
    }

    /**
     * Gets the current status of the order
     * @returns The current status of the order
     */
    get status(): OrderStatus {
        return this._status;
    }

    /**
     * Sets the current status of the order
     * @param value - The new status to set
     */
    set status(value: OrderStatus) {
        this._status = value;
    }

    /**
     * Gets the menu items ordered, mapped by the menu item and quantity
     * @returns A map of {@linkcode MenuItem} and their respective quantities
     */
    get menuItems(): Map<MenuItem, number> {
        return this._menuItems;
    }

    /**
     * Adds a menu item to the order
     * @param menuItem - The {@linkcode MenuItem} to add
     * @param qty - The quantity of the menu item (default is 1)
     */
    addMenuItem(menuItem: MenuItem, qty: number = 1) {
        this._menuItems.set(menuItem, qty);
    }

    /**
     * Gets the inventory items associated with the order
     * @returns The list of {@linkcode InventoryItem}s associated with the order
     */
    get inventoryItems(): InventoryItem[] {
        return this._inventoryItems;
    }

    /**
     * Adds an inventory item to the order
     * @param inventoryItem - The {@linkcode InventoryItem} to add
     */
    addInventoryItem(inventoryItem: InventoryItem): void {
        this._inventoryItems.push(inventoryItem);
    }

    /**
     * Converts the order instance to a dictionary format
     * @returns An {@linkcode OrderDict} representation of the order
     */
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
            ),
            status: this._status
        };
    }
}
