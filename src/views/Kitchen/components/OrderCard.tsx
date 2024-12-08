import React from "react";
import { Badge, Card } from "react-bootstrap";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import Order from "../../../models/Order";
import MenuItem from "../../../models/MenuItem";

interface OrderCardProps {
    order: Order;
    column: string;
    index: number;
}

/**
 * OrderCard component that displays an individual order with its ID, items, and status.
 * The order is displayed in a draggable card, allowing it to be moved between columns.
 * @param order - The order to be displayed in the card.
 * @param column - The current column the order belongs to (e.g., "placed", "in progress").
 * @param index - The index of the order in its column.
 * @constructor
 */
function OrderCard({ order, column, index }: OrderCardProps) {
    const statusStyles: Record<string, string> = {
        placed: "danger",
        "in progress": "warning",
        ready: "info",
        delivered: "success"
    };

    return (
        <Draggable draggableId={order.id} index={index}>
            {(provided: DraggableProvided) => (
                <Card className="mb-3"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                >
                    <Card.Body>
                        <div className="d-flex flex-column mb-3 mt-2">
                            <h6><strong>Order ID:</strong> {order.id}</h6>
                            <small className="text-muted">{`${order.month}/${order.day}/2024 ${order.hour}:00`}</small>
                        </div>
                        <ul className="list-unstyled mb-2">
                            {Array.from(order.menuItems).map(([item, qty]: [MenuItem, number]) => (
                                <li key={item.menuItemId} className="d-flex justify-content-between">
                                    {item.itemName}
                                    <span> x{qty}</span>
                                </li>
                            ))}
                        </ul>
                        <Badge bg={statusStyles[order.status.toString()]} className="position-absolute top-0 start-0">
                            {order.status.toString()}
                        </Badge>
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    );
}

export default OrderCard;
