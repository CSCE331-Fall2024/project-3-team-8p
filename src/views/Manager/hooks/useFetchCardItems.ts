import { useState, useEffect, useCallback } from 'react';
import CardItem from "../../../models/interfaces/CardItem";
import InventoryItemApi from "../../../apis/inventory-item-api";
import MenuItemApi from "../../../apis/menu-item-api";
import EmployeeApi from "../../../apis/employee-api";


enum RightPane {
    MenuItems,
    InventoryItems,
    Employees
}

const useFetchCardItems = (
    menuItemApi: MenuItemApi,
    inventoryItemApi: InventoryItemApi,
    employeeApi: EmployeeApi,
) => {
    const [currRightPane, setCurrRightPane] = useState<RightPane>(RightPane.MenuItems);
    const [cardItems, setCardItems] = useState<CardItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            let itemData: CardItem[];
            switch (currRightPane) {
                case RightPane.MenuItems:
                    itemData = await menuItemApi.getMenuItems();
                    break;
                case RightPane.InventoryItems:
                    itemData = await inventoryItemApi.getInventoryItems();
                    break;
                case RightPane.Employees:
                    itemData = await employeeApi.getEmployees();
                    break;
                default:
                    itemData = [];
                    break;
            }

            setCardItems(itemData);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
                console.error(e.message);
            }
        } finally {
            setLoading(false);
        }
    }, [currRightPane, menuItemApi, inventoryItemApi, employeeApi]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return {
        cardItems,
        loading,
        error,
        currRightPane,
        setCurrRightPane,
        fetchItems
    };
};

export default useFetchCardItems;
export { RightPane };
