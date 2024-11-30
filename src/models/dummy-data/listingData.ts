import { Tabs } from '../../views/Customer/TabsEnum';


import MenuItem from '../MenuItem';

const listings: Record<Tabs, MenuItem[]> = {
    [Tabs.Entrees]: [
        new MenuItem("1", 4.40, "Orange Chicken", { allergens: [], calories: 490, fat: 23, carbohydrates: 51, protein: 25, sugar: 19, isPremium: false, isSpicy: false }, "images/The Original Orange Chicken.png"),
        new MenuItem("2", 4.40, "Kung Pao Chicken", { allergens: [], calories: 290, fat: 19, carbohydrates: 15, protein: 14, sugar: 6, isPremium: false, isSpicy: true }, "images/Kung Pao Chicken.png"),
        new MenuItem("3", 4.40, "Beef with Broccoli", { allergens: [], calories: 150, fat: 7, carbohydrates: 13, protein: 9, sugar: 3, isPremium: false, isSpicy: false }, "images/Broccoli Beef.png"),
        new MenuItem("4", 4.40, "Hot Ones Blazing Bourbon Chicken", { allergens: [], calories: 360, fat: 12, carbohydrates: 25, protein: 28, sugar: 7, isPremium: true, isSpicy: true }, "images/Hot Ones Blazing Bourbon Chicken.png"),
        new MenuItem("5", 4.40, "Honey Walnut Shrimp", { allergens: ["shellfish"], calories: 360, fat: 23, carbohydrates: 24, protein: 13, sugar: 10, isPremium: true, isSpicy: false }, "images/Honey Walnut Shrimp.png"),
        new MenuItem("6", 4.40, "Honey Sesame Chicken Breast", { allergens: [], calories: 420, fat: 15, carbohydrates: 40, protein: 25, sugar: 15, isPremium: false, isSpicy: false }, "images/Honey Sesame Chicken Breast.png"),
        new MenuItem("7", 4.40, "Grilled Teriyaki Chicken", { allergens: [], calories: 300, fat: 13, carbohydrates: 10, protein: 37, sugar: 8, isPremium: false, isSpicy: false }, "images/Grilled Teriyaki Chicken.png"),
        new MenuItem("8", 4.40, "Black Pepper Sirloin Steak", { allergens: [], calories: 240, fat: 10, carbohydrates: 13, protein: 25, sugar: 3, isPremium: true, isSpicy: true }, "images/Black Pepper Sirloin Steak.png"),
        new MenuItem("9", 4.40, "Black Pepper Chicken", { allergens: [], calories: 280, fat: 19, carbohydrates: 9, protein: 17, sugar: 4, isPremium: false, isSpicy: false }, "images/Black Pepper Chicken.png"),
        new MenuItem("10", 4.40, "Broccoli Beef", { allergens: [], calories: 150, fat: 7, carbohydrates: 13, protein: 9, sugar: 3, isPremium: false, isSpicy: false }, "images/Broccoli Beef.png"),
    ],
    [Tabs.Sides]: [
        new MenuItem("11", 4.40, "White Rice", { allergens: [], calories: 380, fat: 0, carbohydrates: 87, protein: 7, sugar: 0, isPremium: false, isSpicy: false }, "images/White Steamed Rice.png"),
        new MenuItem("12", 4.40, "Fried Rice", { allergens: ["egg"], calories: 520, fat: 16, carbohydrates: 81, protein: 11, sugar: 3, isPremium: false, isSpicy: false }, "images/Fried Rice.png"),
        new MenuItem("13", 4.40, "Chow Mein", { allergens: ["egg", "wheat"], calories: 510, fat: 22, carbohydrates: 66, protein: 13, sugar: 9, isPremium: false, isSpicy: false }, "images/Chow Mein.png"),
        new MenuItem("14", 4.40, "Super Greens", { allergens: [], calories: 90, fat: 2, carbohydrates: 13, protein: 5, sugar: 4, isPremium: false, isSpicy: false }, "images/Super Greens.png"),
    ],
    [Tabs.Drinks]: [
        new MenuItem("15", 4.40, "Dr. Pepper", { allergens: [], calories: 150, fat: 0, carbohydrates: 40, protein: 0, sugar: 40, isPremium: false, isSpicy: false }, "images/Dr. Pepper.png"),
        new MenuItem("16", 4.40, "Pepsi", { allergens: [], calories: 150, fat: 0, carbohydrates: 41, protein: 0, sugar: 41, isPremium: false, isSpicy: false }, "images/Pepsi.png"),
        new MenuItem("17", 4.40, "Aquafina", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "images/Aquafina.png"),
        new MenuItem("18", 4.40, "Sweet Tea", { allergens: [], calories: 90, fat: 0, carbohydrates: 22, protein: 0, sugar: 21, isPremium: false, isSpicy: false }, "images/Sweet Tea.png"),
    ],
    [Tabs.Desserts]: [
        new MenuItem("19", 4.99, "Mochi", { allergens: ["milk"], calories: 100, fat: 2, carbohydrates: 20, protein: 2, sugar: 10, isPremium: false, isSpicy: false }, "images/Mochi.png"),
    ],
};

export default listings;
