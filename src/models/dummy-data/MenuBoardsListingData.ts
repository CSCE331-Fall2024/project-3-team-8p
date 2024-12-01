import { Tabs } from '../../views/Customer/TabsEnum';


import MenuBoardItem from '../MenuBoardItem';

const listings: Record<Tabs, MenuBoardItem[]> = {
    [Tabs.Entrees]: [
        new MenuBoardItem("1", 4.40, "Beijing Beef", "images/Beijing Beef.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("2", 4.40, "The Original Orange Chicken", "images/The Original Orange Chicken.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("3", 4.40, "Kung Pao Chicken", "images/Kung Pao Chicken.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("4", 4.40, "Hot Ones Blazing Bourbon Chicken", "images/Hot Ones Blazing Bourbon Chicken.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("5", 4.40, "Honey Walnut Shrimp", "images/Honey Walnut Shrimp.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("6", 4.40, "Honey Sesame Chicken Breast", "images/Honey Sesame Chicken Breast.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("7", 4.40, "Grilled Teriyaki", "images/Grilled Teriyaki Chicken.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("8", 4.40, "Black Pepper Sirloin Steak", "images/Black Pepper Sirloin Steak.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("9", 4.40, "Black Pepper Chicken", "images/Black Pepper Chicken.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("10", 4.40, "Broccoli Beef", "images/Broccoli Beef.png", 1, 2, 3, 4, 5, true, true, ['soy']),
    ],
    [Tabs.Sides]: [
        new MenuBoardItem("11", 4.40, "White Rice", "images/White Steamed Rice.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("12", 4.40, "Fried Rice", "images/Fried Rice.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("13", 4.40, "Chow Mein", "images/Chow Mein.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("14", 4.40, "Super Greens", "images/Super Greens.png", 1, 2, 3, 4, 5, true, true, ['soy']),
    ],
    [Tabs.Drinks]: [
        new MenuBoardItem("15", 4.40, "Dr. Pepper", "images/Dr. Pepper.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("16", 4.40, "Pepsi", "images/Pepsi.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("17", 4.40, "Aquafina", "images/Aquafina.png", 1, 2, 3, 4, 5, true, true, ['soy']),
        new MenuBoardItem("18", 4.40, "Sweet Tea", "images/Sweet Tea.png", 1, 2, 3, 4, 5, true, true, ['soy']),
    ],
    [Tabs.Desserts]: [
        new MenuBoardItem("19", 4.99, "Mochi", "https://via.placeholder.com/300", 1, 2, 3, 4, 5, true, true, ['soy']),
    ],
};

export default listings;
