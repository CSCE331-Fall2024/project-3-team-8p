/**
 * Statuses for an order
 * @remarks An order is considered outstanding if its status is not {@linkcode OrderStatus.DELIVERED}
 */
enum OrderStatus {
    PLACED= "placed",
    IN_PROGRESS = "in progress",
    READY_FOR_DELIVERY = "ready",
    DELIVERED = "delivered",
}
export default OrderStatus;