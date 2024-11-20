import { Tabs } from '../../views/Customer/TabsEnum';


import MenuItem from '../MenuItem';

const listings: Record<Tabs, MenuItem[]> = {
    [Tabs.Entrees]: [
        new MenuItem("1", 4.40, "Beijing Beef", "images/Beijing Beef.png"),
        new MenuItem("2", 4.40, "The Original Orange Chicken", "images/The Original Orange Chicken.png"),
        new MenuItem("3", 4.40, "Kung Pao Chicken", "images/Kung Pao Chicken.png"),
        new MenuItem("4", 4.40, "Hot Ones Blazing Bourbon Chicken", "images/Hot Ones Blazing Bourbon Chicken.png"),
        new MenuItem("5", 4.40, "Honey Walnut Shrimp", "images/Honey Walnut Shrimp.png"),
        new MenuItem("6", 4.40, "Honey Sesame Chicken Breast", "images/Honey Sesame Chicken Breast.png"),
        new MenuItem("7", 4.40, "Grilled Teriyaki", "images/Grilled Teriyaki Chicken.png"),
        new MenuItem("8", 4.40, "Black Pepper Sirloin Steak", "images/Black Pepper Sirloin Steak.png"),
        new MenuItem("9", 4.40, "Black Pepper Chicken", "images/Black Pepper Chicken.png"),
        new MenuItem("10", 4.40, "Broccoli Beef", "images/Broccoli Beef.png"),
    ],
    [Tabs.Sides]: [
        new MenuItem("11", 4.40, "White Rice", "images/White Steamed Rice.png"),
        new MenuItem("12", 4.40, "Fried Rice", "images/Fried Rice.png"),
        new MenuItem("13", 4.40, "Chow Mein", "images/Chow Mein.png"),
        new MenuItem("14", 4.40, "Super Greens", "images/Super Greens.png"),
    ],
    [Tabs.Drinks]: [
        new MenuItem("15", 4.40, "Dr. Pepper", "images/Dr. Pepper.png"),
        new MenuItem("16", 4.40, "Pepsi", "images/Pepsi.png"),
        new MenuItem("17", 4.40, "Aquafina", "images/Aquafina.png"),
        new MenuItem("18", 4.40, "Sweet Tea", "images/Sweet Tea.png"),
    ],
    [Tabs.Desserts]: [
        new MenuItem("19", 4.99, "Mochi", "https://via.placeholder.com/300"),
    ],
};

export default listings;
