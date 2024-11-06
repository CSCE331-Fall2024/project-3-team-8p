import { useState, useEffect } from 'react';
import { MenuItemApi } from "../../apis/menu-item-api";
import CardItem from "../../models/interfaces/CardItem";


enum RightPane {
    MenuItems,
    InventoryItems,
    Employees
}

const menuItemApi = new MenuItemApi();

const useFetchCardItems = () => {
    const [currRightPane, setCurrRightPane] = useState<RightPane>(RightPane.MenuItems);
    const [cardItems, setCardItems] = useState<CardItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                let itemData: CardItem[];
                switch (currRightPane) {
                    case RightPane.MenuItems:
                        itemData = await menuItemApi.getAllMenuItems();
                        break;
                    case RightPane.InventoryItems:
                    case RightPane.Employees:
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
        };

        fetchItems();
    }, [currRightPane]);

    return {
        cardItems,
        loading,
        error,
        currRightPane,
        setCurrRightPane
    };
};

export default useFetchCardItems;
export { RightPane };
