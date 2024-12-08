import CardItem from "./interfaces/CardItem";
import InventoryItemDict from "./dict-types/InventoryItemDict";

/**
 * Model for an inventory item
 */
export default class InventoryItem implements CardItem {
    /**
     * The inventory item's ID
     * @private
     */
    private readonly _inventoryItemId: string;
    /**
     * The cost of the inventory item
     * @private
     */
    private readonly _cost: number;
    /**
     * The available stock of the inventory item
     * @private
     */
    private readonly _availableStock: number;
    /**
     * The name of the inventory item
     * @private
     */
    private readonly _itemName: string;

    /**
     * Maps from an {@linkcode InventoryItemDict} to an {@linkcode InventoryItem}
     * @param dict - The {@linkcode InventoryItemDict} containing inventory item data
     * @returns A new {@linkcode InventoryItem} instance
     */
    static fromDict(dict: InventoryItemDict): InventoryItem {
        return new InventoryItem(
            dict.inventoryItemId,
            dict.cost,
            dict.availableStock,
            dict.itemName
        );
    }

    /**
     * Constructs a new {@linkcode InventoryItem}
     * @param inventoryItemId - The inventory item's ID
     * @param cost - The cost of the inventory item
     * @param availableStock - The available stock of the inventory item
     * @param itemName - The name of the inventory item
     */
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

    /**
     * Gets the inventory item's ID
     * @returns The inventory item's ID
     */
    get id(): string {
        return this._inventoryItemId;
    }

    /**
     * Gets the inventory item's name for display purposes
     * @returns The inventory item's name
     */
    get itemName(): string {
        return this._itemName;
    }

    /**
     * Gets the inventory item's ID
     * @returns The inventory item's ID
     */
    get inventoryItemId(): string {
        return this._inventoryItemId;
    }

    /**
     * Gets the cost of the inventory item
     * @returns The cost of the inventory item
     */
    get cost(): number {
        return this._cost;
    }

    /**
     * Gets the available stock of the inventory item
     * @returns The available stock of the inventory item
     */
    get availableStock(): number {
        return this._availableStock;
    }

    /**
     * Converts the inventory item instance to a dictionary format
     * @returns An {@linkcode InventoryItemDict} representation of the inventory item
     */
    toDict(): InventoryItemDict {
        return {
            inventoryItemId: this._inventoryItemId,
            cost: this._cost,
            availableStock: this._availableStock,
            itemName: this._itemName,
        };
    }
}
