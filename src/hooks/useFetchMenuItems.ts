import { useState, useEffect } from 'react';
import { MenuItemApi } from "../apis/menu-item-api";
import MenuItem from "../models/MenuItem";

const useFetchMenuItems = (client: MenuItemApi) => {
    const [currRightPane, setCurrRightPane] = useState<RightPane>(RightPane.MenuItems);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const data = await client.getMenuItems();
                setMenuItems(data);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                    console.error(e.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [client]);

    return { menuItems, loading, error };
};

export default useFetchMenuItems;
