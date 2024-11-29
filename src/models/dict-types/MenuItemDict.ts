import InventoryItemDict from "./InventoryItemDict";
import NutrtionInfoDict from "./NutritionInfoDict";

export default interface MenuItemDict {
    menuItemId: string;
    price: number;
    itemName: string;
    inventoryItems: InventoryItemDict[];
    // nutritionInfo: NutrtionInfoDict[];
}