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
import useGetLeftPaneData, { LeftPane } from "./hooks/useGetLeftPaneData";
import SingleBarComponent from "./components/SingleBarComponent";
import OrderApi, { XZReportData } from "../../apis/order-api";
import DoubleBarComponent from "./components/DoubleBarComponent";


// TODO: Should probably replace this with some global state
const menuItemApi = new MenuItemApi();
const inventoryItemApi = new InventoryItemApi();
const employeeApi = new EmployeeApi();
const orderApi = new OrderApi();

const getLeftPaneTitle = (currLeftPane: LeftPane) => {
    switch (currLeftPane) {
        case LeftPane.UsageChart:
            return "Inventory Item Usage";
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
        currLeftPane,
        setCurrLeftPane,
        productUsageData,
        getData
    } = useGetLeftPaneData(menuItemApi, inventoryItemApi, orderApi);
    const {
        cardItems,
        loading,
        error,
        currRightPane,
        setCurrRightPane
    } = useGetRightPaneData(menuItemApi, inventoryItemApi, employeeApi);

    const [showModal, setShowModal] = useState(false);
    const [currItem, setCurrItem] = useState<CardItem | undefined>(undefined)

    const handleCloseModal = () => setShowModal(false);

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
                        <>
                            {console.log("Rendering single bar chart")}
                            <SingleBarComponent
                                chartName={getLeftPaneTitle(currLeftPane)}
                                chartData={productUsageData as Record<string, number>}
                                onGetChartData={getData}
                            />
                        </>

                    )}
                    {!(currLeftPane === LeftPane.UsageChart || currLeftPane === LeftPane.SalesReport) && (
                        <>
                            {console.log("Rendering double bar chart")}
                            <DoubleBarComponent
                                chartName={getLeftPaneTitle(currLeftPane)}
                                chartData={productUsageData as XZReportData}
                                onGetChartData={getData}
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

                    <Button
                        className={"mb-3"}
                        onClick={() => handleShowModal()}
                    >
                        Add {getRightPaneTitle(currRightPane)}
                    </Button>

                    <MenuItemModal
                        currMenuItem={currItem as MenuItem}
                        showModal={showModal}
                        onClose={handleCloseModal}
                        menuItemApi={menuItemApi}
                    />

                    <ItemGrid items={cardItems} onItemClick={handleShowModal} />
                </Col>
            </Row>

        </div>
    );
}

export default ManagerView;