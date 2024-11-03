import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Col, Row } from "react-bootstrap";
import './ManagerView.css';
import ItemGrid from "./ItemGrid";
import CardItem from "../../models/interfaces/CardItem";
import { MENU_ITEM_DATA, INVENTORY_ITEM_DATA, EMPLOYEE_DATA } from "../../models/dummy-data/dummy-data";
import "./ManagerView.css"

enum LeftPane {
    Summary,
    UsageChart,
    SalesReport,
    XReport,
    ZReport
}

enum RightPane {
    MenuItems,
    InventoryItems,
    Employees
}

function ManagerView() {
    const [currLeftPane, setCurrLeftPane] = useState<LeftPane>(LeftPane.Summary);
    const [currRightPane, setCurrRightPane] = useState<RightPane>(RightPane.MenuItems);
    const [items, setItems] = useState<CardItem[]>([]);

    // Load info in the right pane
    useEffect(() => {
        switch (currRightPane) {
            case RightPane.MenuItems:
                setItems(MENU_ITEM_DATA);
                break;
            case RightPane.InventoryItems:
                setItems(INVENTORY_ITEM_DATA);
                break;
            case RightPane.Employees:
                setItems(EMPLOYEE_DATA);
                break;
        }
    }, [currRightPane]);

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
                    <ItemGrid items={items} />
                </Col>
            </Row>

        </div>
    );
}

export default ManagerView;