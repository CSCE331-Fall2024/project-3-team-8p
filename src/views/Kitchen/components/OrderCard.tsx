import React from "react";
import { Badge, Card } from "react-bootstrap";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import Order from "../../../models/Order";

interface OrderCardProps {
    order: Order;
    column: string;
    index: number;
}

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
                        <div className="d-flex justify-content-between align-items-start mb-2 mt-2">
                            <h6><strong>Order ID:</strong> {order.id}</h6>
                            {/*<small className="text-muted">{time}</small>*/}
                        </div>
                        {/*<ul className="list-unstyled mb-2">*/}
                        {/*    {items.map((item, i) => (*/}
                        {/*        <li key={i}>{item}</li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}
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