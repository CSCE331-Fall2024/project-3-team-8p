import InventoryItem from "./InventoryItem";
import CardItem from "./interfaces/CardItem";

export default class MenuItem implements CardItem {
    private readonly _menuItemId: string;
    private readonly _price: number;
    private readonly _itemName: string;
    private readonly _inventoryItems: InventoryItem[];
    private readonly _imageUrl: string;  // Add imageUrl property
    private _quantityOrdered: number;   // Add quantityOrdered property

    constructor(menuItemId: string, price: number, itemName: string, imageUrl?: string, quantityOrdered: number = 0) {
        this._menuItemId = menuItemId;
        this._price = price;
        this._itemName = itemName;
        this._imageUrl = imageUrl ?? "";  // Initialize imageUrl
        this._inventoryItems = [];
        this._quantityOrdered = quantityOrdered;  // Initialize quantityOrdered (default to 0)
    }

    get id(): string {
        return this._menuItemId;
    }

    get menuItemId(): string {
        return this._menuItemId;
    }

    get price(): number {
        return this._price;
    }

    get itemName(): string {
        return this._itemName;
    }

    get inventoryItems(): InventoryItem[] {
        return this._inventoryItems;
    }

    get imageUrl(): string {  // Getter for imageUrl
        return this._imageUrl;
    }

    get quantityOrdered(): number {  // Getter for quantityOrdered
        return this._quantityOrdered;
    }

    set quantityOrdered(quantity: number) {  // Setter for quantityOrdered
        if (quantity >= 0) {
            this._quantityOrdered = quantity;
        }
    }

    addInventoryItem(inventoryItem: InventoryItem): void {
        this._inventoryItems.push(inventoryItem);
    }
}