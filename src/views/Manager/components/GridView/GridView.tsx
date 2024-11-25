import React, { useState } from 'react';
import Nav from "react-bootstrap/Nav";
import useGridData from "./useGridData";
import MenuItemModal from "./MenuItemModal";
import MenuItem from "../../../../models/MenuItem";
import InventoryItemModal from "./InventoryItemModal";
import InventoryItem from "../../../../models/InventoryItem";
import EmployeeModal from "./EmployeeModal";
import Employee from "../../../../models/Employee";
import ItemGrid from "./ItemGrid";
import CardItem from "../../../../models/interfaces/CardItem";
import MenuItemApi from "../../../../apis/menu-item-api";
import InventoryItemApi from "../../../../apis/inventory-item-api";
import EmployeeApi from "../../../../apis/employee-api";
import GridViewTab from "./GridViewTab";
import "../../css/GridView.css"

const menuItemApi = new MenuItemApi();
const inventoryItemApi = new InventoryItemApi();
const employeeApi = new EmployeeApi();

const getGridViewTitle = (currGridView: GridViewTab) => {
    switch (currGridView) {
        case GridViewTab.MenuItems:
            return "Menu Item";
        case GridViewTab.InventoryItems:
            return "Inventory Item";
        case GridViewTab.Employees:
            return "Employee";
        default:
            return "";
    }
}

function GridView() {
    const {
        gridItems,
        refreshItems,
        loading,
        error,
        currGridPane,
        setCurrGridPane,
    } = useGridData(menuItemApi, inventoryItemApi, employeeApi);
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
        <div className={"grid-view"}>
            <Nav
                variant={"pills"}
                activeKey={currGridPane}
                onSelect={(selectedKey: string | null) => setCurrGridPane(Number(selectedKey) as GridViewTab)}
                className={"pb-5"}
            >
                <Nav.Item>
                    <Nav.Link eventKey={GridViewTab.MenuItems}>Menu Items</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={GridViewTab.InventoryItems}>Inventory Items</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={GridViewTab.Employees}>Employees</Nav.Link>
                </Nav.Item>
            </Nav>

            {currGridPane === GridViewTab.MenuItems && (
                <MenuItemModal
                    currMenuItem={currItem as MenuItem}
                    showModal={showModal}
                    onClose={handleCloseModal}
                    api={menuItemApi}
                />
            )}

            {currGridPane === GridViewTab.InventoryItems && (
                <InventoryItemModal
                    currItem={currItem as InventoryItem}
                    showModal={showModal}
                    onClose={handleCloseModal}
                    api={inventoryItemApi}
                />
            )}

            {currGridPane === GridViewTab.Employees && (
                <EmployeeModal
                    currEmployee={currItem as Employee}
                    showModal={showModal}
                    onClose={handleCloseModal}
                    api={employeeApi}
                />
            )}

            <ItemGrid
                pageTitle={getGridViewTitle(currGridPane)}
                items={gridItems}
                onAddOrUpdateItem={handleShowModal}
            />
        </div>
    );
}

export default GridView;