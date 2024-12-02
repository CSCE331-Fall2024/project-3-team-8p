import MenuBoardsDict from "./dict-types/MenuBoardsDict";
import MenuItemCategory from "./enums/MenuItemCategory";
import NutritionInfoDict from "./dict-types/NutritionInfoDict";

export default class MenuBoardItem {
    private readonly _menuItemId: string;
    private readonly _price: number;
    private readonly _itemName: string;
    private readonly _category: string;
    public readonly _nutritionInfo: NutritionInfoDict;

    private _translatedItemName: string = "";

    // Static method to create a MenuBoardItem from a dict
    static fromDict(dict: MenuBoardsDict): MenuBoardItem {
        return new MenuBoardItem(
            dict.menuItemId,
            dict.price,
            dict.itemName,
            dict.category,
            dict.nutritionInfo,
        );
    }

    // Static method to get items by category
    static fromCategory(category: string, allItems: MenuBoardsDict[]): MenuBoardItem[] {
        return allItems
            .filter(item => item.category === category)
            .map(MenuBoardItem.fromDict);
    }

    constructor(
        menuItemId: string,
        price: number,
        itemName: string,
        category: string,
        nutritionInfo: NutritionInfoDict
    ) {
        this._menuItemId = menuItemId;
        this._price = price;
        this._itemName = itemName;
        this._category = category;
        this._nutritionInfo = nutritionInfo;
    }

    // Getters
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

    get category(): string {
        return this._category;
    }

    get nutritionInfo(): NutritionInfoDict {
        return this._nutritionInfo;
    }
}
