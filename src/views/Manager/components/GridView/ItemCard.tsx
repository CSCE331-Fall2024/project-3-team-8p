import React from 'react';
import CardItem from "../../../../models/interfaces/CardItem";
import "../../css/ItemCard.css"

interface ItemCardProps<T extends CardItem> {
    item: T;
    onClick: (item: T) => void;
}

function ItemCard<T extends CardItem>({ item, onClick }: ItemCardProps<T>) {
    return (
        <div className="item-card p-2 h-100 flex flex-col" onClick={() => onClick(item)}>
            <img src={"images/sample_image.png"} alt={"menu item"} className={"w-100 rounded"} />
            <span className={"mt-1 two-line-truncate"}>{item.itemName}</span>
        </div>
    );
}

export default ItemCard;