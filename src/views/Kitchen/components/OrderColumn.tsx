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

/**
 * OrderColumn component displays a list of orders within a specific column (e.g., "Placed", "In Progress").
 * Each order is represented by an `OrderCard` and the column is made droppable using drag-and-drop functionality.
 * @param title - The title of the column (e.g., "Placed Orders").
 * @param columnId - The unique ID of the column (optional, defaults to the title).
 * @param orders - A list of orders to display in the column.
 * @constructor
 */
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

                            {orders.length > 0 ? orders.map((order, index) => (
                                <OrderCard key={order.id} order={order} column={title} index={index} />
                            )) : (
                                <span className={"text-muted"}>No orders found</span>
                            )}
                            {provided.placeholder}
                        </Card.Body>
                    )}
                </Droppable>
            </Card>
        </Col>
    )
}

export default OrderColumn;
