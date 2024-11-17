import { useState, useEffect, useCallback } from "react";
import { MenuItemApi } from "../../../apis/menu-item-api";
import { InventoryItemApi } from "../../../apis/inventory-item-api";


enum LeftPane {
    UsageChart,
    SalesReport,
    XReport,
    ZReport
}

const useGetLeftPaneData = (
    menuItemApi: MenuItemApi,
    inventoryItemApi: InventoryItemApi,
) => {
    const [currLeftPane, setCurrLeftPane] = useState<LeftPane>(LeftPane.UsageChart);
    const [productUsageData, setProductUsageData] = useState<Record<string, number> | undefined>(undefined);

    const getData = useCallback(async (
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number
    ) => {
        let reportData: Record<string, number> | undefined;

        switch (currLeftPane) {
            case LeftPane.UsageChart:
                reportData = await menuItemApi.getProductUsageReport(startMonth, endMonth, startDay, endDay);
                break;
            case LeftPane.SalesReport:
            case LeftPane.XReport:
            case LeftPane.ZReport:
            default:
                reportData = undefined;
        }
        setProductUsageData(reportData);
    }, [currLeftPane, menuItemApi]);

    return { currLeftPane, productUsageData, getData };
}

export default useGetLeftPaneData;
export { LeftPane };