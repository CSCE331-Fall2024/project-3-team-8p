import { useState, useCallback } from "react";
import MenuItemApi from "../../../apis/menu-item-api";
import InventoryItemApi from "../../../apis/inventory-item-api";
import OrderApi, { XZReportData } from "../../../apis/order-api";


enum LeftPane {
    UsageChart,
    SalesReport,
    XReport,
    ZReport
}

const useGetLeftPaneData = (
    menuItemApi: MenuItemApi,
    inventoryItemApi: InventoryItemApi,
    orderApi: OrderApi,
) => {
    const [currLeftPane, setCurrLeftPane] = useState<LeftPane>(LeftPane.UsageChart);
    const [barChartData, setBarChartData] = useState<
        Record<string, number> | XZReportData | undefined
    >(undefined);

    const getChartData = useCallback(async (
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number
    ) => {
        let reportData: Record<string, number> | XZReportData | undefined;
        switch (currLeftPane) {
            case LeftPane.UsageChart:
                reportData = await inventoryItemApi.getProductUsageReport(startMonth, endMonth, startDay, endDay);
                break;
            case LeftPane.SalesReport:
                reportData = await menuItemApi.getSalesReport(startMonth, endMonth, startDay, endDay);
                break;
            case LeftPane.XReport:
                reportData = await orderApi.getXReport();
                break;
            case LeftPane.ZReport:
                reportData = await orderApi.getZReport();
                break;
            default:
                reportData = undefined;
        }
        setBarChartData(reportData);
    }, [currLeftPane, menuItemApi, inventoryItemApi, orderApi]);

    return { currLeftPane, setCurrLeftPane, productUsageData: barChartData, getData: getChartData };
}

export default useGetLeftPaneData;
export { LeftPane };