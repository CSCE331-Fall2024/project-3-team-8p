import InventoryItem from "./InventoryItem";
import CardItem from "./interfaces/CardItem";
import { v4 as uuidv4 } from "uuid";

export default class MenuItem implements CardItem {
    private readonly _menuItemId: string;
    private readonly _price: number;
    private readonly _itemName: string;
    private readonly _inventoryItems: InventoryItem[];


    constructor(menuItemId: string, price: number, itemName: string) {
        this._menuItemId = menuItemId || uuidv4();
        this._price = price || 0;
        this._itemName = itemName || "";
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