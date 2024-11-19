import { useState, useEffect, useCallback } from "react";
import MenuItemApi from "../../../apis/menu-item-api";
import InventoryItemApi from "../../../apis/inventory-item-api";


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
    const [singleBarChartData, setSingleBarChartData] = useState<Record<string, number> | undefined>(undefined);

    const getChartData = useCallback(async (
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number
    ) => {
        let reportData: Record<string, number> | undefined;

        switch (currLeftPane) {
            case LeftPane.UsageChart:
                reportData = await inventoryItemApi.getProductUsageReport(startMonth, endMonth, startDay, endDay);
                break;
            case LeftPane.SalesReport:
                reportData = await menuItemApi.getSalesReport(startMonth, endMonth, startDay, endDay);
                break;
            case LeftPane.XReport:
            case LeftPane.ZReport:
            default:
                reportData = undefined;
        }
        setSingleBarChartData(reportData);
    }, [currLeftPane, menuItemApi, inventoryItemApi]);

    return { currLeftPane, setCurrLeftPane, productUsageData: singleBarChartData, getData: getChartData };
}

export default useGetLeftPaneData;
export { LeftPane };