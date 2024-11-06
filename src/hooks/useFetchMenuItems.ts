import { useState, useEffect } from 'react';
import { MenuItemApi } from "../apis/menu-item-api";
import MenuItem from "../models/MenuItem";

const useFetchMenuItems = (client: MenuItemApi) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const data = await client.getMenuItems();
                setMenuItems(data);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                    console.error(e.message);
                }
            }
        };

        fetchMenuItems();
    }, [client]);

    return { menuItems, error };
};

export default useFetchMenuItems;
