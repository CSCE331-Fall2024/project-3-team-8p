import Employee from "../Employee";
import { v4 as uuidv4 } from "uuid";
import MenuItem from "../MenuItem";
import InventoryItem from "../InventoryItem";

export const MENU_ITEM_DATA = [
    new MenuItem(uuidv4(), 50.00, "Orange Chicken", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 45.00, "Kung Pao Chicken", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 50.00, "Orange Chicken", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 45.00, "Kung Pao Chicken", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 40.00, "Beef with Broccoli", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 35.00, "Sweet and Sour Pork", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 42.00, "Mongolian Beef", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 38.00, "Sesame Chicken", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 32.00, "Honey Walnut Shrimp", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 30.00, "Vegetable Stir Fry", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 25.00, "Egg Drop Soup", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 28.00, "Wonton Soup", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 22.00, "Spring Rolls", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 26.00, "Fried Rice", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 24.00, "Chow Mein", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 36.00, "Spicy Tofu Stir Fry", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 48.00, "Peking Duck", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
    new MenuItem(uuidv4(), 34.00, "General Tso's Chicken", { allergens: [], calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, isPremium: false, isSpicy: false }, "https://via.placeholder.com/300"),
];

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

export const EMPLOYEE_DATA = [
    new Employee(uuidv4(), "Soham Nagawanshi", true),
    new Employee(uuidv4(), "Pikachu", false),
    new Employee(uuidv4(), "Ash", false),
    new Employee(uuidv4(), "Charizard", false),
    new Employee(uuidv4(), "Ryan Kha", false),
];