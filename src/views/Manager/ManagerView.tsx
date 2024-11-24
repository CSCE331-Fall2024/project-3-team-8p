import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Button, Col, Row } from "react-bootstrap";
import './css/ManagerView.css';
import ItemGrid from "./components/ItemGrid";
import "./css/ManagerView.css"
import useGetRightPaneData, { RightPane } from "./hooks/useGetRightPaneData";
import MenuItemApi from "../../apis/menu-item-api";
import InventoryItemApi from "../../apis/inventory-item-api";
import EmployeeApi from "../../apis/employee-api";
import MenuItemModal from "./components/MenuItemModal";
import CardItem from "../../models/interfaces/CardItem";
import MenuItem from "../../models/MenuItem";
import SingleBarComponent from "./components/SingleBarComponent";
import OrderApi from "../../apis/order-api";
import DoubleBarComponent from "./components/DoubleBarComponent";
import InventoryItemModal from "./components/InventoryItemModal";
import InventoryItem from "../../models/InventoryItem";
import EmployeeModal from "./components/EmployeeModal";
import Employee from "../../models/Employee";


// TODO: Should probably replace this with some global state
const menuItemApi = new MenuItemApi();
const inventoryItemApi = new InventoryItemApi();
const employeeApi = new EmployeeApi();
const orderApi = new OrderApi();

enum LeftPane {
    UsageChart,
    SalesReport,
    XReport,
    ZReport
}

const getLeftPaneTitle = (currLeftPane: LeftPane) => {
    switch (currLeftPane) {
        case LeftPane.UsageChart:
            return "Product Usage Report";
        case LeftPane.SalesReport:
            return "Sales Report";
        case LeftPane.XReport:
            return "X Report";
        case LeftPane.ZReport:
            return "Z Report";
        default:
            return "";
    }
}

const getRightPaneTitle = (currRightPane: RightPane) => {
    switch (currRightPane) {
        case RightPane.MenuItems:
            return "Menu Item";
        case RightPane.InventoryItems:
            return "Inventory Item";
        case RightPane.Employees:
            return "Employee";
        default:
            return "";
    }
}

function ManagerView() {
    const {
        cardItems,
        refreshItems,
        loading,
        error,
        currRightPane,
        setCurrRightPane
    } = useGetRightPaneData(menuItemApi, inventoryItemApi, employeeApi);

    const [currLeftPane, setCurrLeftPane] = useState<LeftPane>(LeftPane.UsageChart)
    const [showModal, setShowModal] = useState(false);
    const [currItem, setCurrItem] = useState<CardItem | undefined>(undefined)

    const handleCloseModal = (didUpdate: boolean) => {
        if (didUpdate) {
            refreshItems();
        }
        setShowModal(false);
    }

    const handleShowModal = (item?: CardItem) => {
        setCurrItem(item);
        setShowModal(true);
    };

    return (
        <div className={"Manager-view"}>
            <Row>
                <Col className={"px-4"}>
                    <Nav
                        variant={"pills"}
                        activeKey={currLeftPane}
                        onSelect={(selectedKey: string | null) => setCurrLeftPane(Number(selectedKey) as LeftPane)}
                        className={"pt-3 pb-5"}
                    >
                        <Nav.Item>
                            <Nav.Link eventKey={LeftPane.UsageChart}>Usage Chart</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={LeftPane.SalesReport}>Sales Report</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={LeftPane.XReport}>X-report</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={LeftPane.ZReport}>Z-report</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {/* Left pane */}
                    {(currLeftPane === LeftPane.UsageChart || currLeftPane === LeftPane.SalesReport) && (
                        <SingleBarComponent
                            chartName={getLeftPaneTitle(currLeftPane)}
                            dataProvider={currLeftPane === LeftPane.UsageChart
                                ? inventoryItemApi.getProductUsageReport.bind(inventoryItemApi)
                                : menuItemApi.getSalesReport.bind(menuItemApi)}
                        />
                    )}
                    {(currLeftPane === LeftPane.XReport || currLeftPane === LeftPane.ZReport) && (
                        <>
                            <DoubleBarComponent
                                chartName={getLeftPaneTitle(currLeftPane)}
                                dataProvider={currLeftPane === LeftPane.XReport
                                    ? orderApi.getXReport.bind(orderApi)
                                    : orderApi.getZReport.bind(orderApi)
                                }
                            />
                        </>

                    )}
                </Col>
                <Col className={"px-4"}>
                    <Nav
                        variant={"pills"}
                        activeKey={currRightPane}
                        onSelect={(selectedKey: string | null) => setCurrRightPane(Number(selectedKey) as RightPane)}
                        className={"pt-3 pb-5"}
                    >
                        <Nav.Item>
                            <Nav.Link eventKey={RightPane.MenuItems}>Menu Items</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={RightPane.InventoryItems}>Inventory Items</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={RightPane.Employees}>Employees</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    {currRightPane === RightPane.MenuItems && (
                        <MenuItemModal
                            currMenuItem={currItem as MenuItem}
                            showModal={showModal}
                            onClose={handleCloseModal}
                            api={menuItemApi}
                        />
                    )}

                    {currRightPane === RightPane.InventoryItems && (
                        <InventoryItemModal
                            currItem={currItem as InventoryItem}
                            showModal={showModal}
                            onClose={handleCloseModal}
                            api={inventoryItemApi}
                        />
                    )}

                    {currRightPane === RightPane.Employees && (
                        <EmployeeModal
                            currEmployee={currItem as Employee}
                            showModal={showModal}
                            onClose={handleCloseModal}
                            api={employeeApi}
                        />
                    )}

                    <ItemGrid
                        pageTitle={getRightPaneTitle(currRightPane)}
                        items={cardItems}
                        onAddOrUpdateItem={handleShowModal}
                    />
                </Col>
            </Row>

        </div>
    );
}

export default ManagerView;