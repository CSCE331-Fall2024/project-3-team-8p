import InventoryItem from "./InventoryItem";
import CardItem from "./interfaces/CardItem";
import MenuItemDict from "./dict-types/MenuItemDict";
import InventoryItemDict from "./dict-types/InventoryItemDict";
import NutritionInfoDict from "./dict-types/NutritionInfoDict";

export default class MenuItem implements CardItem {
    private readonly _menuItemId: string;
    private readonly _price: number;
    private readonly _itemName: string;
    private readonly _imageUrl: string;
    private readonly _inventoryItems: InventoryItem[];
    public readonly _nutritionInfo: NutritionInfoDict;

    static fromDict(dict: MenuItemDict): MenuItem {
        const menuItem = new MenuItem(dict.menuItemId, dict.price, dict.itemName, dict.nutritionInfo);
        dict.inventoryItems
            .sort((a: InventoryItemDict, b: InventoryItemDict) => a.itemName.localeCompare(b.itemName))
            .forEach((item: InventoryItemDict) => {
                menuItem.addInventoryItem(InventoryItem.fromDict(item));
            });

        return menuItem;
    }

    // FIXME: remove imageUrl and quantityOrdered attributes
    // FIXME: make imageUrl a computed property
    constructor(
        menuItemId: string,
        price: number,
        itemName: string,
        nutritionInfo: NutritionInfoDict,
        imageUrl?: string
    ) {
        this._menuItemId = menuItemId;
        this._price = price;
        this._itemName = itemName;
        this._imageUrl = imageUrl ?? "";
        this._inventoryItems = [];
        this._nutritionInfo = nutritionInfo;
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

    addInventoryItem(inventoryItem: InventoryItem): void {
        this._inventoryItems.push(inventoryItem);
    }

    get nutritionInfo(): NutritionInfoDict {
        return this._nutritionInfo;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    toDict(): MenuItemDict {
        return {
            menuItemId: this._menuItemId,
            price: this._price,
            itemName: this._itemName,
            inventoryItems: this._inventoryItems.map((item: InventoryItem): InventoryItemDict => ({
                inventoryItemId: item.inventoryItemId,
                cost: item.cost,
                availableStock: item.availableStock,
                itemName: item.itemName,
            })),
            nutritionInfo: this._nutritionInfo
        };
    }
}