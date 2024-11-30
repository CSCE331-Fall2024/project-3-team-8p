import InventoryItem from "./InventoryItem";
import CardItem from "./interfaces/CardItem";
import MenuItemDict from "./dict-types/MenuItemDict";
import InventoryItemDict from "./dict-types/InventoryItemDict";
import MenuItemCategory from "./enums/MenuItemCategory";
import NutritionInfoDict from "./dict-types/NutritionInfoDict";

export default class MenuItem implements CardItem {
    private readonly _menuItemId: string;
    private readonly _price: number;
    private readonly _itemName: string;
    private readonly _category: MenuItemCategory;
    private readonly _isDiscounted: boolean;
    private readonly _inventoryItems: InventoryItem[];
    public readonly _nutritionInfo: NutritionInfoDict;

    private _translatedItemName: string = "";

    static fromDict(dict: MenuItemDict): MenuItem {
        console.log(dict.category);
        const menuItem = new MenuItem(
            dict.menuItemId,
            dict.price,
            dict.itemName,
            dict.category as MenuItemCategory,
            dict.isDiscounted,
            dict.nutritionInfo,
        );
        dict.inventoryItems
            .sort((a: InventoryItemDict, b: InventoryItemDict) => a.itemName.localeCompare(b.itemName))
            .forEach((item: InventoryItemDict) => {
                menuItem.addInventoryItem(InventoryItem.fromDict(item));
            });
        return menuItem;
    }

    constructor(
        menuItemId: string,
        price: number,
        itemName: string,
        category: MenuItemCategory,
        isDiscounted: boolean,
        nutritionInfo: NutritionInfoDict,
    ) {
        this._menuItemId = menuItemId;
        this._price = price;
        this._itemName = itemName;
        this._category = category;
        this._isDiscounted = isDiscounted;
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

    get translatedItemName(): string {
        return this._translatedItemName;
    }

    set translatedItemName(value: string) {
        this._translatedItemName = value;
    }

    get category(): MenuItemCategory {
        return this._category;
    }

    get isDiscounted(): boolean {
        return this._isDiscounted;
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

    toDict(): MenuItemDict {
        return {
            menuItemId: this._menuItemId,
            price: this._price,
            itemName: this._itemName,
            category: this._category.toString(),
            isDiscounted: this._isDiscounted,
            inventoryItems: this._inventoryItems.map((item: InventoryItem): InventoryItemDict => ({
                inventoryItemId: item.inventoryItemId,
                cost: item.cost,
                availableStock: item.availableStock,
                itemName: item.itemName,
            })),
            nutritionInfo: this._nutritionInfo,
        };
    }
}