import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import "./css/ManagerView.css"
import GridView from "./components/GridView/GridView";
import ReportView from "./components/ReportView/ReportView";

/**
 * The manager view
 * @constructor
 */
function ManagerView() {
    return (
        <Container fluid>
            <div className={"manager-view align-items-stretch py-4"}>
                <Row>
                    <Col className={"px-4"}>
                        <ReportView />
                    </Col>
                    <Col className={"px-4"}>
                        <GridView />
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default ManagerView;