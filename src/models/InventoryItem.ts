import CardItem from "./interfaces/CardItem";

export default class InventoryItem implements CardItem {
    private readonly _inventoryItemId: string;
    private readonly _cost: number;
    private readonly _availableStock: number;
    private readonly _itemName: string;

    constructor(
        inventoryItemId: string,
        cost: number,
        availableStock: number,
        itemName: string
    ) {
        this._inventoryItemId = inventoryItemId;
        this._cost = cost;
        this._availableStock = availableStock;
        this._itemName = itemName;
    }

    get id() {
        return this._inventoryItemId;
    }

    get itemName() {
        return this._itemName;
    }

    get inventoryItemId() {
        return this._inventoryItemId;
    }

    get cost() {
        return this._cost;
    }

    get availableStock() {
        return this._availableStock;
    }
}