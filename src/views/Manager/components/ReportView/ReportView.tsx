import React, { useState } from 'react';
import Nav from "react-bootstrap/Nav";
import SingleBarChart from "./SingleBarChart";
import DoubleBarComponent from "./DoubleBarChart";
import ReportViewTab from "./ReportViewTab";
import MenuItemApi from "../../../../apis/menu-item-api";
import InventoryItemApi from "../../../../apis/inventory-item-api";
import OrderApi from "../../../../apis/order-api";

const menuItemApi = new MenuItemApi();
const inventoryItemApi = new InventoryItemApi();
const orderApi = new OrderApi();

const getReportViewTabTitle = (currReportViewTab: ReportViewTab) => {
    switch (currReportViewTab) {
        case ReportViewTab.UsageChart:
            return "Product Usage Report";
        case ReportViewTab.SalesReport:
            return "Sales Report";
        case ReportViewTab.XReport:
            return "X Report";
        case ReportViewTab.ZReport:
            return "Z Report";
        default:
            return "";
    }
}

function ReportView() {
    const [currReportViewTab, setCurrReportViewTab] = useState<ReportViewTab>(ReportViewTab.UsageChart)

    return (
        <div className={"report-view"}>
            <Nav
                variant={"pills"}
                activeKey={currReportViewTab}
                onSelect={(selectedKey: string | null) => setCurrReportViewTab(Number(selectedKey) as ReportViewTab)}
                className={"pb-5"}
            >
                <Nav.Item>
                    <Nav.Link eventKey={ReportViewTab.UsageChart}>Usage Chart</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={ReportViewTab.SalesReport}>Sales Report</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={ReportViewTab.XReport}>X-report</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={ReportViewTab.ZReport}>Z-report</Nav.Link>
                </Nav.Item>
            </Nav>

            {(currReportViewTab === ReportViewTab.UsageChart || currReportViewTab === ReportViewTab.SalesReport) && (
                <SingleBarChart
                    chartName={getReportViewTabTitle(currReportViewTab)}
                    dataProvider={currReportViewTab === ReportViewTab.UsageChart
                        ? inventoryItemApi.getProductUsageReport.bind(inventoryItemApi)
                        : menuItemApi.getSalesReport.bind(menuItemApi)}
                />
            )}

            {(currReportViewTab === ReportViewTab.XReport || currReportViewTab === ReportViewTab.ZReport) && (
                <DoubleBarComponent
                    chartName={getReportViewTabTitle(currReportViewTab)}
                    dataProvider={currReportViewTab === ReportViewTab.XReport
                        ? orderApi.getXReport.bind(orderApi)
                        : orderApi.getZReport.bind(orderApi)
                    }
                />
            )}
        </div>
    );
}

export default ReportView;