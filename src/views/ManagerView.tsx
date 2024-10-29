import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Col, Row } from "react-bootstrap";
import './ManagerView.css';
import ItemGrid from "../components/manager/ItemGrid";
import CardItem from "../models/interfaces/CardItem";
import { MENU_ITEM_DATA, INVENTORY_ITEM_DATA, EMPLOYEE_DATA } from "../components/manager/DummyData";
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

    // Load items based on selected tab
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
        <div className={"manager-view"}>
            <Row>
                <Col>
                    <Nav variant={"tabs"} defaultActiveKey={"/"}>
                        <Nav.Item>
                            <Nav.Link href="#">Summary</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Usage Chart</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Sales Report</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">X-report</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Z-report</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col>
                    <Nav
                        variant={"tabs"}
                        activeKey={currRightPane}
                        onSelect={(selectedKey) => setCurrRightPane(Number(selectedKey) as RightPane)}
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