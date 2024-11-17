import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import './css/ManagerView.css';
import ItemGrid from "./components/ItemGrid";
import "./css/ManagerView.css"
import useFetchCardItems, { RightPane } from "./hooks/useFetchCardItems";
import MenuItemApi from "../../apis/menu-item-api";
import InventoryItemApi from "../../apis/inventory-item-api";
import EmployeeApi from "../../apis/employee-api";
import MenuItemModal from "./components/MenuItemModal";
import CardItem from "../../models/interfaces/CardItem";
import MenuItem from "../../models/MenuItem";


enum LeftPane {
    Summary,
    UsageChart,
    SalesReport,
    XReport,
    ZReport
}

// TODO: Should probably replace this with some global state
const menuItemApi = new MenuItemApi();
const inventoryItemApi = new InventoryItemApi()
const employeeApi = new EmployeeApi()

const getPageTitle = (currRightPane: RightPane) => {
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
        loading,
        error,
        currRightPane,
        setCurrRightPane,
        fetchItems
    } = useFetchCardItems(menuItemApi, inventoryItemApi, employeeApi);

    const [showModal, setShowModal] = useState(false);
    const [currItem, setCurrItem] = useState<CardItem | undefined>(undefined)

    const handleCloseModal = async (didAddOrUpdate: boolean) => {
        if (didAddOrUpdate) {
            await fetchItems();
        }
        setShowModal(false);
    }

    const handleShowAddModal = () => {
        setCurrItem(undefined);
        setShowModal(true);
    }

    const handleShowUpdateModal = (item: CardItem) => {
        setCurrItem(item);
        setShowModal(true);
    }

    return (
        <div className={"Manager-view"}>
            <Row>
                <Col>
                    <Nav
                        variant={"pills"}
                        defaultActiveKey={"/"}
                        className={"px-3"}
                    >
                        <Nav.Item>
                            <Nav.Link eventKey={LeftPane.Summary}>Summary</Nav.Link>
                        </Nav.Item>
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

                </Col>
                <Col>
                    <Nav
                        variant={"pills"}
                        activeKey={currRightPane}
                        onSelect={(selectedKey) => setCurrRightPane(Number(selectedKey) as RightPane)}
                        className={"px-3"}
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
                        className={"my-4 mx-3"}
                        onClick={() => handleShowAddModal()}
                    >
                        Add {getPageTitle(currRightPane)}
                    </Button>

                    <MenuItemModal
                        currMenuItem={currItem as MenuItem}
                        showModal={showModal}
                        onClose={handleCloseModal}
                        menuItemApi={menuItemApi}
                    />

                    {loading && (
                        <>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </>
                    )}
                    {!loading && <ItemGrid items={cardItems} onItemClick={handleShowUpdateModal} />}
                </Col>
            </Row>

        </div>
    );
}

export default ManagerView;