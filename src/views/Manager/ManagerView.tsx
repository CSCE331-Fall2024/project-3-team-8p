import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Col, Row } from "react-bootstrap";
import './ManagerView.css';
import ItemGrid from "./ItemGrid";
import "./ManagerView.css"
import useFetchCardItems, { RightPane } from "./useFetchCardItems";


enum LeftPane {
    Summary,
    UsageChart,
    SalesReport,
    XReport,
    ZReport
}

function ManagerView() {
    const {
        cardItems,
        loading,
        error,
        currRightPane,
        setCurrRightPane
    } = useFetchCardItems();

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
                    <ItemGrid items={cardItems} />
                </Col>
            </Row>

        </div>
    );
}

export default ManagerView;