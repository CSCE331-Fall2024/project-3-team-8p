import MenuItemDict from "./dict-types/MenuItemDict";
import MenuBoardsDict from "./dict-types/MenuBoardsDict";

export default class MenuBoardItem {
    private readonly _menuItemId: string;
    private readonly _price: number;
    private readonly _itemName: string;
    private readonly _imageUrl: string;
    private readonly _calories: number;
    private readonly _fat: number;
    private readonly _protein: number;
    private readonly _sugar: number;
    private readonly _carbohydrates: number;
    private readonly _isPremium: boolean;
    private readonly _isSpicy: boolean;
    private readonly _allergens: string[];

    constructor(
        menuItemId: string,
        price: number,
        itemName: string,
        imageUrl: string,
        calories: number,
        fat: number,
        protein: number,
        sugar: number,
        carbohydrates: number,
        isPremium: boolean,
        isSpicy: boolean,
        allergens?: string[]
    ) {
        this._menuItemId = menuItemId;
        this._price = price;
        this._itemName = itemName;
        this._imageUrl = imageUrl;
        this._calories = calories;
        this._fat = fat;
        this._protein = protein;
        this._sugar = sugar;
        this._carbohydrates = carbohydrates;
        this._isPremium = isPremium;
        this._isSpicy = isSpicy;
        this._allergens = allergens ?? [];
    }

    static fromDict(dict: MenuBoardsDict): MenuBoardItem {
        return new MenuBoardItem(
            dict.menuItemId,
            dict.price,
            dict.name,
            dict.imageUrl ?? "",
            dict.calories,
            dict.fat,
            dict.protein,
            dict.sugar,
            dict.carbohydrates,
            dict.isPremium,
            dict.isSpicy,
            dict.allergens
        );
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

    get imageUrl(): string {
        return this._imageUrl;
    }

    get calories(): number {
        return this._calories;
    }

    get fat(): number {
        return this._fat;
    }

    get protein(): number {
        return this._protein;
    }

    get sugar(): number {
        return this._sugar;
    }

    get carbohydrates(): number {
        return this._carbohydrates;
    }

    get isPremium(): boolean {
        return this._isPremium;
    }

    get isSpicy(): boolean {
        return this._isSpicy;
    }

    get allergens(): string[] {
        return this._allergens;
    }

    toDict(): MenuBoardsDict {
        return {
            menuItemId: this._menuItemId,
            name: this._itemName,
            price: this._price,
            imageUrl: this._imageUrl,
            calories: this._calories,
            fat: this._fat,
            protein: this._protein,
            sugar: this._sugar,
            carbohydrates: this._carbohydrates,
            isPremium: this._isPremium,
            isSpicy: this._isSpicy
        };
    }
}
