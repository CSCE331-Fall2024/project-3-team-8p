import React, { useState } from 'react';
import Nav from "react-bootstrap/Nav";
import useGridData from "./useGridData";
import MenuItemModal from "../modals/MenuItemModal";
import MenuItem from "../../../../models/MenuItem";
import InventoryItemModal from "../modals/InventoryItemModal";
import InventoryItem from "../../../../models/InventoryItem";
import EmployeeModal from "../modals/EmployeeModal";
import Employee from "../../../../models/Employee";
import ItemGrid from "./ItemGrid";
import CardItem from "../../../../models/interfaces/CardItem";
import MenuItemApi from "../../../../apis/menu-item-api";
import InventoryItemApi from "../../../../apis/inventory-item-api";
import EmployeeApi from "../../../../apis/employee-api";
import GridViewTab from "./GridViewTab";

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

/**
 * The GridView component renders a dynamic grid view with multiple tabs (Menu Items, Inventory Items, Employees).
 * It displays different modals and grids based on the current tab selection and allows interaction with data items.
 *
 * @constructor
 */
function GridView() {
    const {
        gridItems,
        inventoryItems,
        refreshItems,
        loading,
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
        <div className={"grid-view h-100 d-flex flex-column"}>
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
                    allInventoryItems={inventoryItems}
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

            <div className={"flex-grow-1"}>
                <ItemGrid
                    pageTitle={getGridViewTitle(currGridPane)}
                    loading={loading}
                    items={gridItems}
                    onAddOrUpdateItem={handleShowModal}
                />
            </div>
        </div>
    );
}

export default GridView;
