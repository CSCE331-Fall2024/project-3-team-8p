import InventoryItemDict from "./InventoryItemDict";

export default interface MenuItemDict {
    menuItemId: string;
    price: number;
    itemName: string;
    inventoryItems: InventoryItemDict[];
}