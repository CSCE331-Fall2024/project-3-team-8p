import InventoryItemDict from "./InventoryItemDict";
import NutritionInfoDict from "./NutritionInfoDict";

export default interface MenuItemDict {
    menuItemId: string;
    price: number;
    itemName: string;
    inventoryItems: InventoryItemDict[];
    nutritionInfo: NutritionInfoDict[];
}