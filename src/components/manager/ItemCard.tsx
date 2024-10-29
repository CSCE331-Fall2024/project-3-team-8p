import React from 'react';
import CardItem from "../../models/interfaces/CardItem";
import SampleImg from "../images/sample_image.png";
import "./ItemCard.css"

interface ItemCardProps<T extends CardItem> {
    item: T;
}

function ItemCard<T extends CardItem>({ item }: ItemCardProps<T>) {
    return (
        <div className="item-card p-2 border text-center h-100">
            <img src={SampleImg} alt={"menu item"} className={"w-100"} />
            <span>{item.itemName}</span><br/>
        </div>
    );
}

export default ItemCard;