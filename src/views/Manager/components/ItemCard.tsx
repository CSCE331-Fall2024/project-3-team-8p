import React from 'react';
import CardItem from "../../../models/interfaces/CardItem";
import SampleImg from "../../images/sample_image.png";
import "../css/ItemCard.css"

interface ItemCardProps<T extends CardItem> {
    item: T;
    onClick: (item: T) => void;
}

function ItemCard<T extends CardItem>({ item, onClick }: ItemCardProps<T>) {
    return (
        <div className="item-card p-2 h-100" onClick={() => onClick(item)}>
            <img src={SampleImg} alt={"menu item"} className={"w-100 rounded"} />
            <span>{item.itemName}</span>
        </div>
    );
}

export default ItemCard;