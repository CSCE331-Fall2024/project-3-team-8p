import { Tabs } from '../../views/Customer/TabsEnum';


import MenuItem from '../MenuItem';

const listings: Record<Tabs, MenuItem[]> = {
    [Tabs.Entrees]: [
        new MenuItem("1", 4.40, "Beijing Beef"),
        new MenuItem("2", 4.40, "The Original Orange Chicken"),
        new MenuItem("3", 4.40, "Kung Pao Chicken"),
        new MenuItem("4", 4.40, "Hot Ones Blazing Bourbon Chicken"),
        new MenuItem("5", 4.40, "Honey Walnut Shrimp"),
        new MenuItem("6", 4.40, "Honey Sesame Chicken Breast"),
        new MenuItem("7", 4.40, "Grilled Teriyaki Chicken"),
        new MenuItem("8", 4.40, "Black Pepper Sirloin Steak"),
        new MenuItem("9", 4.40, "Black Pepper Chicken"),
        new MenuItem("10", 4.40, "Broccoli Beef"),
    ],
    [Tabs.Sides]: [
        new MenuItem("11", 4.40, "White Steamed Rice"),
        new MenuItem("12", 4.40, "Fried Rice"),
        new MenuItem("13", 4.40, "Chow Mein"),
        new MenuItem("14", 4.40, "Super Greens"),
    ],
    [Tabs.Drinks]: [
        new MenuItem("15", 4.40, "Dr. Pepper"),
        new MenuItem("16", 4.40, "Pepsi"),
        new MenuItem("17", 4.40, "Aquafina"),
        new MenuItem("18", 4.40, "Sweet Tea"),
    ],
    [Tabs.Desserts]: [
        new MenuItem("19", 4.99, "Mochi"),
    ],
};

export default listings;
