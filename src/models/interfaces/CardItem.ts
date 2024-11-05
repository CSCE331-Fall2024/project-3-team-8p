import BaseItem from "./BaseItem";

// Generic interface for UI components that have a grid view
// e.g., CashierView, ManagerView
export default interface CardItem extends BaseItem {
    itemName: string;
}