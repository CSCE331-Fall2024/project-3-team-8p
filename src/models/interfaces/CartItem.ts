import InventoryItemDict from "../dict-types/InventoryItemDict";
import NutritionInfoDict from "../dict-types/NutritionInfoDict";

/**
 * Interface for an item contained in a cart
 * @see CartContext.tsx
 */
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