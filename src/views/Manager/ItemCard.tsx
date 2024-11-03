import React from 'react';
import CardItem from "../../models/interfaces/CardItem";
import SampleImg from "../../../public/images/sample_image.png";
import "./ItemCard.css"

interface ItemCardProps<T extends CardItem> {
    item: T;
}

function ItemCard<T extends CardItem>({ item }: ItemCardProps<T>) {
    return (
        <div className="item-card p-2 h-100">
            <img src={SampleImg} alt={"menu item"} className={"w-100 rounded"} />
            <span>{item.itemName}</span>
        </div>
    );
}

export default ItemCard;