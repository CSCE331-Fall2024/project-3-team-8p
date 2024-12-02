import InventoryItemDict from "./InventoryItemDict";
import NutritionInfoDict from "./NutritionInfoDict";

export default interface MenuItemDict {
    menuItemId: string;
    price: number;
    itemName: string;
    category: string;
    isDiscounted: boolean;
    inventoryItems: InventoryItemDict[];
    nutritionInfo: NutritionInfoDict;
}