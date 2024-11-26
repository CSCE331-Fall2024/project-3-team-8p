import CardItem from "./interfaces/CardItem";
import InventoryItemDict from "./dict-types/InventoryItemDict";

export default class InventoryItem implements CardItem {
    private readonly _inventoryItemId: string;
    private readonly _cost: number;
    private readonly _availableStock: number;
    private readonly _itemName: string;

    static fromDict(dict: InventoryItemDict): InventoryItem {
        return new InventoryItem(
            dict.inventoryItemId,
            dict.cost,
            dict.availableStock,
            dict.itemName
        );
    }

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

    get id(): string {
        return this._inventoryItemId;
    }

    get itemName(): string {
        return this._itemName;
    }

    get inventoryItemId(): string {
        return this._inventoryItemId;
    }

    get cost(): number {
        return this._cost;
    }

    get availableStock(): number {
        return this._availableStock;
    }

    toDict(): InventoryItemDict {
        return {
            inventoryItemId: this._inventoryItemId,
            cost: this._cost,
            availableStock: this._availableStock,
            itemName: this._itemName,
        };
    }
}