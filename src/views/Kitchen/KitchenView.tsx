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
        const draggedOrder = [...placedOrders, ...inProgressOrders, ...completedOrders]
            .find(order => order.id === draggableId);
        if (!draggedOrder) return;

        const addOrderToList = (list: Order[], index: number, order: Order) => {
            const updatedList = [...list];
            updatedList.splice(index, 0, order);
            return updatedList;
        };

        // Update the relevant lists
        let newPlacedOrders = placedOrders;
        let newInProgressOrders = inProgressOrders;
        let newCompletedOrders = completedOrders;

        console.log(source.droppableId);

        switch (source.droppableId) {
            case OrderStatus.PLACED:
                newPlacedOrders = placedOrders.filter(order => order.id !== draggedOrder.id)
                break;
            case OrderStatus.IN_PROGRESS:
                newInProgressOrders = inProgressOrders.filter(order => order.id !== draggedOrder.id)
                break;
            case OrderStatus.COMPLETED:
                newCompletedOrders = completedOrders.filter(order => order.id !== draggedOrder.id)
                break;
        }

        // Update the dragged order's status
        draggedOrder.status = destination.droppableId as OrderStatus;

        switch (destination.droppableId) {
            case OrderStatus.PLACED:
                newPlacedOrders = addOrderToList(newPlacedOrders, destination.index, draggedOrder);
                break;
            case OrderStatus.IN_PROGRESS:
                newInProgressOrders = addOrderToList(newInProgressOrders, destination.index, draggedOrder);
                break;
            case OrderStatus.COMPLETED:
                newCompletedOrders = addOrderToList(newCompletedOrders, destination.index, draggedOrder);
                break;
        }

        console.log(newPlacedOrders);

        // Update state
        setPlacedOrders(newPlacedOrders);
        setInProgressOrders(newInProgressOrders);
        setCompletedOrders(newCompletedOrders);
    };


    useEffect(() => {
        setPlacedOrders(ORDER_DATA.filter(order => order.status === OrderStatus.PLACED));
        setInProgressOrders(ORDER_DATA.filter(order => order.status === OrderStatus.IN_PROGRESS));
        setCompletedOrders(ORDER_DATA.filter(order => order.status === OrderStatus.COMPLETED));
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
                        columnId={"inProgress"}
                        orders={inProgressOrders}
                    />
                    <OrderColumn
                        title="Completed"
                        columnId={"completed"}
                        orders={completedOrders}
                    />
                </Row>
            </Container>
        </DragDropContext>
    );
}

export default KitchenView;