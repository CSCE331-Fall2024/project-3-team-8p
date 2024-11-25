import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import CardItem from "../../../models/interfaces/CardItem";
import ItemCard from "./ItemCard";
import "./ItemGrid.css"

interface ItemGridProps<T extends CardItem> {
    items: T[];
    onItemClick: (item: T) => void;
}

function ItemGrid<T extends CardItem>({ items, onItemClick }: ItemGridProps<T>) {

    return (
        <Container className={"item-grid py-4"}>
            <Row>
                {items.map((item: T) => (
                    <Col key={item.id} md={3} className={"mb-4"}>
                        <ItemCard item={item} onClick={onItemClick} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ItemGrid;