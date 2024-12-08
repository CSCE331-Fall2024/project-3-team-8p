import React from 'react';
import CardItem from "../../../../models/interfaces/CardItem";
import "../../css/ItemCard.css"

interface ItemCardProps<T extends CardItem> {
    item: T;
    onClick: (item: T) => void;
}

/**
 * The ItemCard component represents a clickable card displaying an item with its image and name.
 * When clicked, it triggers the `onClick` callback with the item as the argument.
 *
 * @template T - The type of the item, which must extend `CardItem`.
 * @param item - The item to be displayed in the card.
 * @param onClick - Callback function that is triggered when the card is clicked, passing the item as an argument.
 * @constructor
 */
function ItemCard<T extends CardItem>({ item, onClick }: ItemCardProps<T>) {
    return (
        <div className="item-card p-2 h-100 flex flex-col cursor-pointer" onClick={() => onClick(item)}>
            <img
                src={item.itemUrl ?? "images/sample_image.png"}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/sample_image.png";
                }}
                alt={"menu item"}
                className={"w-100 rounded"}
            />
            <span className={"mt-1 two-line-truncate"}>{item.itemName}</span>
        </div>
    );
}

export default ItemCard;
