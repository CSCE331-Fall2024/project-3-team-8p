import InventoryItemDict from "../dict-types/InventoryItemDict";
import NutritionInfoDict from "../dict-types/NutritionInfoDict";

export default interface CartItem {
    menuItemId: string;
    price: number;
    itemName: string;
    translatedItemName: string;
    category: string;
    isDiscounted: boolean;
    inventoryItems: InventoryItemDict[];
    nutritionInfo: NutritionInfoDict;

    imageUrl: string;
    quantityOrdered: number;
}