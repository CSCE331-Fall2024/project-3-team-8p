import CardItem from "./interfaces/CardItem";
import MenuBoardsDict from "./dict-types/MenuBoardsDict";
import MenuItemCategory from "./enums/MenuItemCategory";
import NutritionInfoDict from "./dict-types/NutritionInfoDict";

export default class MenuBoardItem implements CardItem {
    private readonly _menuItemId: string;
    private readonly _price: number;
    private readonly _itemName: string;
    private readonly _category: MenuItemCategory;
    public readonly _nutritionInfo: NutritionInfoDict;

    private _translatedItemName: string = "";

    static fromDict(dict: MenuBoardsDict): MenuBoardItem {
        return new MenuBoardItem(
            dict.menuItemId,
            dict.price,
            dict.itemName,
            dict.category as MenuItemCategory,
            dict.nutritionInfo,
        );
    }

    constructor(
        menuItemId: string,
        price: number,
        itemName: string,
        category: MenuItemCategory,
        nutritionInfo: NutritionInfoDict,
    ) {
        this._menuItemId = menuItemId;
        this._price = price;
        this._itemName = itemName;
        this._category = category;
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

    get nutritionInfo(): NutritionInfoDict {
        return this._nutritionInfo;
    }

    toDict(): MenuBoardsDict {
        return {
            menuItemId: this._menuItemId,
            price: this._price,
            itemName: this._itemName,
            category: this._category.toString(),
            nutritionInfo: this._nutritionInfo,
        };
    }
}