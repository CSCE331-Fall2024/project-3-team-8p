import React from 'react';
import Nav from 'react-bootstrap/Nav';

function ManagerView() {
    return (
        <div className={"manager-view"}>
            <Nav variant={"tabs"} defaultActiveKey={"/"}>
                <Nav.Item>
                    <Nav.Link href="#">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default ManagerView;