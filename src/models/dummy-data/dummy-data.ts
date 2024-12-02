import Employee from "../Employee";
import { v4 as uuidv4 } from "uuid";
import InventoryItem from "../InventoryItem";
import Order from "../Order";
import OrderStatus from "../enums/OrderStatus";

export const INVENTORY_ITEM_DATA = [
    new InventoryItem(uuidv4(), 0.50, 500, "Napkins"),
    new InventoryItem(uuidv4(), 1.20, 300, "Plastic Forks"),
    new InventoryItem(uuidv4(), 1.50, 200, "Plastic Knives"),
    new InventoryItem(uuidv4(), 1.00, 400, "Plastic Spoons"),
    new InventoryItem(uuidv4(), 3.00, 150, "Paper Plates"),
    new InventoryItem(uuidv4(), 5.00, 100, "To-Go Containers"),
    new InventoryItem(uuidv4(), 0.10, 1000, "Straws"),
    new InventoryItem(uuidv4(), 2.50, 200, "Small Sauce Cups"),
    new InventoryItem(uuidv4(), 8.00, 50, "Soy Sauce Bottles"),
    new InventoryItem(uuidv4(), 0.05, 1000, "Chopsticks"),
    new InventoryItem(uuidv4(), 6.00, 80, "Disposable Gloves"),
    new InventoryItem(uuidv4(), 4.50, 150, "Cleaning Spray"),
    new InventoryItem(uuidv4(), 3.00, 300, "Trash Bags"),
    new InventoryItem(uuidv4(), 2.20, 250, "Dish Soap"),
    new InventoryItem(uuidv4(), 7.50, 75, "Hand Sanitizer"),
];

export const EMPLOYEE_DATA: Employee[] = [
    new Employee(uuidv4(), "Soham Nagawanshi", true),
    new Employee(uuidv4(), "Pikachu", false),
    new Employee(uuidv4(), "Ash", false),
    new Employee(uuidv4(), "Charizard", false),
    new Employee(uuidv4(), "Ryan Kha", false),
];

export const ORDER_DATA: Order[] = [
    new Order(uuidv4(), uuidv4(), 11, 48, 20, 10, 25.00, OrderStatus.PLACED),
    new Order(uuidv4(), uuidv4(), 11, 48, 20, 10, 50.00, OrderStatus.PLACED),
    new Order(uuidv4(), uuidv4(), 11, 48, 20, 10, 28.00, OrderStatus.IN_PROGRESS),
    new Order(uuidv4(), uuidv4(), 11, 48, 20, 10, 31.00, OrderStatus.IN_PROGRESS),
    new Order(uuidv4(), uuidv4(), 11, 48, 20, 10, 14.00, OrderStatus.READY_FOR_DELIVERY),
]