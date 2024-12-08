import InventoryItem from "./InventoryItem";
import CardItem from "./interfaces/CardItem";
import MenuItemDict from "./dict-types/MenuItemDict";
import InventoryItemDict from "./dict-types/InventoryItemDict";
import NutritionInfoDict from "./dict-types/NutritionInfoDict";
import MenuItemCategory from "./enums/MenuItemCategory";

/**
 * Model for a menu item
 */
export default class MenuItem implements CardItem {
    /**
     * The menu item's ID
     * @private
     */
    private readonly _menuItemId: string;
    /**
     * The price of the menu item
     * @private
     */
    private readonly _price: number;
    /**
     * The name of the menu item
     * @private
     */
    private readonly _itemName: string;
    /**
     * The category of the menu item
     * @private
     */
    private readonly _category: MenuItemCategory;
    /**
     * Boolean indicating whether the menu item is discounted
     * @private
     */
    private readonly _isDiscounted: boolean;
    /**
     * The inventory items associated with the menu item
     * @private
     */
    private readonly _inventoryItems: InventoryItem[];
    /**
     * The nutritional information of the menu item
     * @public
     */
    public readonly _nutritionInfo: NutritionInfoDict;
    /**
     * The translated name of the menu item
     * @private
     */
    private _translatedItemName: string = "";

    /**
     * Maps from a {@linkcode MenuItemDict} to a {@linkcode MenuItem}
     * @param dict - The {@linkcode MenuItemDict} containing menu item data
     * @returns A new {@linkcode MenuItem} instance
     */
    static fromDict(dict: MenuItemDict): MenuItem {
        const menuItem = new MenuItem(
            dict.menuItemId,
            dict.price,
            dict.itemName,
            dict.category as MenuItemCategory,
            dict.isDiscounted,
            dict.nutritionInfo,
        );
        if (dict.inventoryItems) {
            dict.inventoryItems
                .sort((a: InventoryItemDict, b: InventoryItemDict) => a.itemName.localeCompare(b.itemName))
                .forEach((item: InventoryItemDict) => {
                    menuItem.addInventoryItem(InventoryItem.fromDict(item));
                });
        }
        return menuItem;
    }

    /**
     * Constructs a new {@linkcode MenuItem}
     * @param menuItemId - The menu item's ID
     * @param price - The price of the menu item
     * @param itemName - The name of the menu item
     * @param category - The category of the menu item
     * @param isDiscounted - Whether the menu item is discounted
     * @param nutritionInfo - The nutritional information of the menu item
     */
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

    /**
     * Gets the menu item's ID
     * @returns The menu item's ID
     */
    get id(): string {
        return this._menuItemId;
    }

    /**
     * Gets the menu item's ID
     * @returns The menu item's ID
     */
    get menuItemId(): string {
        return this._menuItemId;
    }

    /**
     * Gets the price of the menu item
     * @returns The price of the menu item
     */
    get price(): number {
        return this._price;
    }

    /**
     * Gets the menu item's name for display purposes
     * @returns The menu item's name
     */
    get itemName(): string {
        return this._itemName;
    }

    /**
     * Gets the translated name of the menu item
     * @returns The translated name of the menu item
     */
    get translatedItemName(): string {
        return this._translatedItemName;
    }

    /**
     * Sets the translated name of the menu item
     * @param value - The translated name to set
     */
    set translatedItemName(value: string) {
        this._translatedItemName = value;
    }

    /**
     * Gets the category of the menu item
     * @returns The category of the menu item
     */
    get category(): MenuItemCategory {
        return this._category;
    }

    /**
     * Gets the discount status of the menu item
     * @returns `true` if the menu item is discounted, `false` otherwise
     */
    get isDiscounted(): boolean {
        return this._isDiscounted;
    }

    /**
     * Gets the inventory items associated with the menu item
     * @returns The list of inventory items for the menu item
     */
    get inventoryItems(): InventoryItem[] {
        return this._inventoryItems;
    }

    /**
     * Adds an inventory item to the menu item
     * @param inventoryItem - The {@linkcode InventoryItem} to add
     */
    addInventoryItem(inventoryItem: InventoryItem): void {
        if (!this.inventoryItems.includes(inventoryItem)) {
            this._inventoryItems.push(inventoryItem);
        }
    }

    /**
     * Gets the nutritional information of the menu item
     * @returns The nutritional information of the menu item
     */
    get nutritionInfo(): NutritionInfoDict {
        return this._nutritionInfo;
    }

    /**
     * Converts the menu item instance to a dictionary format
     * @returns A {@linkcode MenuItemDict} representation of the menu item
     */
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
