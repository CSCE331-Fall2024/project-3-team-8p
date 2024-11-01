import InventoryItem from "./InventoryItem";
import CardItem from "./interfaces/CardItem";

export default class MenuItem implements CardItem {
    private readonly _menuItemId: string;
    private readonly _price: number;
    private readonly _itemName: string;
    private readonly _inventoryItems: InventoryItem[];

    constructor(menuItemId: string, price: number, itemName: string) {
        this._menuItemId = menuItemId;
        this._price = price;
        this._itemName = itemName;
        this._inventoryItems = [];
    }

    get id() {
        return this._menuItemId;
    }

    get menuItemId() {
        return this._menuItemId;
    }

    get price() {
        return this._price;
    }

    get itemName() {
        return this._itemName;
    }

    get inventoryItems() {
        return this._inventoryItems;
    }

    addInventoryItem(inventoryItem: InventoryItem) {
        this._inventoryItems.push(inventoryItem);
    }
}