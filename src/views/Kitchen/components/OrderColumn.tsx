import React from 'react';
import { Card, Col } from "react-bootstrap";
import { Droppable, DroppableProvided } from "@hello-pangea/dnd";
import Order from "../../../models/Order";
import OrderCard from "./OrderCard";

interface OrderColumnProps {
    title: string;
    columnId?: string;
    orders: Order[];
}

function OrderColumn({ title, columnId = title, orders }: OrderColumnProps) {
    return (
        <Col className="h-80vh">
            <Card className="h-100">
                <Card.Header>
                    <h5 className="mb-0">{title}</h5>
                </Card.Header>
                <Droppable droppableId={columnId}>
                    {(provided: DroppableProvided) => (
                        <Card.Body
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {orders.map((order, index) => (
                                <OrderCard key={order.id} order={order} column={title} index={index} />
                            ))}
                            {provided.placeholder}
                        </Card.Body>
                    )}
                </Droppable>
            </Card>
        </Col>
    )
}

export default OrderColumn;