import BaseItem from "./BaseItem";

/**
 * Generic interface for items to be displayed in a grid view
 */
export default interface CardItem extends BaseItem {
    itemName: string;
    itemUrl?: string;
}