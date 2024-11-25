import { useState, useEffect, useCallback } from 'react';
import CardItem from "../../../../models/interfaces/CardItem";
import InventoryItemApi from "../../../../apis/inventory-item-api";
import MenuItemApi from "../../../../apis/menu-item-api";
import EmployeeApi from "../../../../apis/employee-api";
import GridViewTab from "./GridViewTab";


const useGridData = (
    menuItemApi: MenuItemApi,
    inventoryItemApi: InventoryItemApi,
    employeeApi: EmployeeApi,
) => {
    const [currGridPane, setCurrGridPane] = useState<GridViewTab>(GridViewTab.MenuItems);
    const [gridItems, setGridItems] = useState<CardItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const refreshItems = useCallback(async() => {
        setLoading(true);
        try {
            let itemData: CardItem[];
            switch (currGridPane) {
                case GridViewTab.MenuItems:
                    itemData = await menuItemApi.getMenuItems();
                    break;
                case GridViewTab.InventoryItems:
                    itemData = await inventoryItemApi.getInventoryItems();
                    break;
                case GridViewTab.Employees:
                    itemData = await employeeApi.getEmployees();
                    break;
                default:
                    itemData = [];
                    break;
            }
            setGridItems(itemData);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
                console.error(e.message);
            }
        } finally {
            setLoading(false);
        }
    }, [currGridPane, menuItemApi, inventoryItemApi, employeeApi]);

    useEffect(() => {
        refreshItems();
    }, [refreshItems]);

    return {
        gridItems,
        refreshItems,
        loading,
        error,
        currGridPane,
        setCurrGridPane
    };
};

export default useGridData;
