import NutritionInfoDict from "./NutritionInfoDict";

export default interface MenuBoardsDict {
    menuItemId: string;
    price: number;
    itemName: string;
    category: string;
    nutritionInfo: NutritionInfoDict;
}