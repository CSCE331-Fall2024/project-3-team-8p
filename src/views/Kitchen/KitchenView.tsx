import React, { useEffect, useState } from 'react';
import { Container, Row } from "react-bootstrap";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ORDER_DATA } from "../../models/dummy-data/dummy-data";
import Order from "../../models/Order";
import OrderStatus from "../../models/enums/OrderStatus";
import OrderColumn from "./components/OrderColumn";
import "./css/KitchenView.css";

function KitchenView() {
    const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
    const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
    const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
    const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([]);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;

        // If we dropped some item outside a droppable zone, do nothing
        if (!destination) return;

        // If we dropped some item back in its original location, do nothing
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // Find the dragged order
        const draggedOrder = [...placedOrders, ...inProgressOrders, ...completedOrders, ...deliveredOrders]
            .find(order => order.id === draggableId);
        if (!draggedOrder) return;

        let newPlacedOrders: Order[] = placedOrders;
        let newInProgressOrders: Order[] = inProgressOrders;
        let newCompletedOrders: Order[] = completedOrders;
        let newDeliveredOrders: Order[] = deliveredOrders;

        switch (source.droppableId) {
            case OrderStatus.PLACED:
                newPlacedOrders = placedOrders.filter(order => order.id !== draggedOrder.id)
                break;
            case OrderStatus.IN_PROGRESS:
                newInProgressOrders = inProgressOrders.filter(order => order.id !== draggedOrder.id)
                break;
            case OrderStatus.READY_FOR_DELIVERY:
                newCompletedOrders = completedOrders.filter(order => order.id !== draggedOrder.id)
                break;
            case OrderStatus.DELIVERED:
                newDeliveredOrders = deliveredOrders.filter(order => order.id !== draggedOrder.id)
                break;
        }

        // Update the dragged order's status
        draggedOrder.status = destination.droppableId as OrderStatus;

        switch (destination.droppableId) {
            case OrderStatus.PLACED:
                newPlacedOrders.splice(destination.index, 0, draggedOrder);
                break;
            case OrderStatus.IN_PROGRESS:
                newInProgressOrders.splice(destination.index, 0, draggedOrder);
                break;
            case OrderStatus.READY_FOR_DELIVERY:
                newCompletedOrders.splice(destination.index, 0, draggedOrder);
                break;
            case OrderStatus.DELIVERED:
                newDeliveredOrders.splice(destination.index, 0, draggedOrder);
                break;
        }

        setPlacedOrders(newPlacedOrders);
        setInProgressOrders(newInProgressOrders);
        setCompletedOrders(newCompletedOrders);
        setDeliveredOrders(newDeliveredOrders);
    };

    useEffect(() => {
        setPlacedOrders(ORDER_DATA.filter(order => order.status === OrderStatus.PLACED));
        setInProgressOrders(ORDER_DATA.filter(order => order.status === OrderStatus.IN_PROGRESS));
        setCompletedOrders(ORDER_DATA.filter(order => order.status === OrderStatus.READY_FOR_DELIVERY));
    }, []);

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Container className="px-3 py-4">
                <Row>
                    <OrderColumn
                        title="Placed Orders"
                        columnId={"placed"}
                        orders={placedOrders}
                    />
                    <OrderColumn
                        title="In Progress"
                        columnId={"in progress"}
                        orders={inProgressOrders}
                    />
                    <OrderColumn
                        title="Ready for Delivery"
                        columnId={"ready"}
                        orders={completedOrders}
                    />
                    <OrderColumn
                        title="Delivered"
                        columnId={"delivered"}
                        orders={deliveredOrders}
                    />
                </Row>
            </Container>
        </DragDropContext>
    );
}

export default KitchenView;