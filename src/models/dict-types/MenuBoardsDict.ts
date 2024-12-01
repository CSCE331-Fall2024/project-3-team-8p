export default interface MenuBoardsDict {
    menuItemId: string;
    name: string;
    price: number;
    imageUrl: string;
    calories: number;
    fat: number;
    protein: number;
    sugar: number;
    carbohydrates: number;
    isPremium: boolean;
    isSpicy: boolean;
    allergens?: string[];
}