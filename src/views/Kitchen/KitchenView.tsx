import React, { useEffect, useState } from 'react';
import { Container, Row } from "react-bootstrap";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Order from "../../models/Order";
import OrderStatus from "../../models/enums/OrderStatus";
import OrderColumn from "./components/OrderColumn";
import "./css/KitchenView.css";
import OrderApi from "../../apis/order-api";
import LoadingView from "../shared/LoadingView";

const orderApi = new OrderApi();

/**
 * KitchenView component that displays and manages orders in different stages:
 * Placed, In Progress, Ready for Delivery, and Delivered.
 * Users can drag and drop orders between columns to update their statuses.
 * @constructor
 */
function KitchenView() {
    const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
    const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
    const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
    const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    /**
     * Handles the completion of a drag-and-drop action, updating the order's status
     * and reordering the orders in the corresponding columns.
     * @param result - The result of the drag-and-drop action.
     */
    const handleDragEnd = async (result: DropResult) => {
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

        // Update the order's status on the backend
        orderApi.updateOrderStatus(draggedOrder.orderId, draggedOrder.status);

        setPlacedOrders(newPlacedOrders);
        setInProgressOrders(newInProgressOrders);
        setCompletedOrders(newCompletedOrders);
        setDeliveredOrders(newDeliveredOrders);
    };

    useEffect(() => {
        const fetchOutstandingOrders = async () => {
            try {
                setLoading(true);
                const outstandingOrders = await orderApi.getOutstandingOrders();
                setPlacedOrders(outstandingOrders.filter(order => order.status === OrderStatus.PLACED));
                setInProgressOrders(outstandingOrders.filter(order => order.status === OrderStatus.IN_PROGRESS));
                setCompletedOrders(outstandingOrders.filter(order => order.status === OrderStatus.READY_FOR_DELIVERY));
            } catch (error) {
                console.log("Error when fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOutstandingOrders();
    }, []);

    return (
        loading ? (
            <LoadingView color={"white"} />
        ) : (
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
        )
    );
}

export default KitchenView;
