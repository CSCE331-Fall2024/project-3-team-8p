package org.project3.rest_api.database.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.project3.rest_api.database.DBConnector;
import org.project3.rest_api.database.QueryTemplate;
import org.project3.rest_api.database.SQLToJavaMapper;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.wrappers.InventoryItemWithQty;
import org.project3.rest_api.models.wrappers.MenuItemWithQty;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.*;

/**
 * Implements menu-related database actions
* */

@Repository
public class DBMenuService extends DBConnector {

    /**
     * Selects all menu items
     *
     * @return a list of all menu items
     */
    public List<MenuItem> selectMenuItems() {
        List<MenuItem> items = null;
        try {
            items = executeQuery(
                    String.format(QueryTemplate.selectAllMenuItems),
                    SQLToJavaMapper::menuItemMapper
            );

            items.forEach(menuItem -> {
                menuItem.inventoryItems = selectMenuItemInventoryItems(menuItem.menuItemId);
            });

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

    /**
     * Adds a new menu item
     *
     * @param newMenuItem the menu item to add
     */
    public void insertMenuItem(MenuItem newMenuItem) {

        String nutritionInfoJson = "";
        try {
            nutritionInfoJson = objectWriter.writeValueAsString(newMenuItem.nutritionInfo);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        executeUpdate(String.format(QueryTemplate.insertMenuItem,
                newMenuItem.menuItemId,
                newMenuItem.itemName,
                newMenuItem.price,
                nutritionInfoJson,
                newMenuItem.category
        ));
        mapMenutoInventory(newMenuItem.menuItemId, newMenuItem.inventoryItems);
    }


    /**
     * Updates menuItemToInventoryItem table
     * @param menuItemId ID of menu item associated with ItemWithQties
     * @param inventoryItems List of inventory items and quantities included in menu item
     * */
    public void mapMenutoInventory(UUID menuItemId,
                                   List<InventoryItem> inventoryItems) {

        // create an item with quantities object
        List<InventoryItemWithQty> invItemsWithQty = new ArrayList<>();

        inventoryItems.forEach(
                inventoryItem -> {
                    invItemsWithQty.add(
                            new InventoryItemWithQty(
                                    inventoryItem,
                                    1
                            )
                    );
                }
        );
        // add a new entry for each inventory item
        insertMenuItemInventoryItems(menuItemId, invItemsWithQty);

    }

    /**
     * Maps menu items to inventory items
     *
     * @param invItemsWithQty inventory items and quantities associated with menu items
     * */
    public void insertMenuItemInventoryItems(UUID menuItemId, List<InventoryItemWithQty> invItemsWithQty) {

        invItemsWithQty.forEach(
                invItem -> {
                    executeUpdate(String.format(QueryTemplate.insertMenuItemToInventoryItem,
                            menuItemId,
                            invItem.inventoryItem.inventoryItemId,
                            invItem.quantity
                    ));
                }
        );

    }

    /**
     * Updates an existing menu item
     *
     * @param updatedMenuItem a {@code MenuItem} object representing the menu item to update
     */
    public void updateMenuItem(MenuItem updatedMenuItem) {

        //update nutrition info
        String nutritionInfoJson = "";
        try {
            nutritionInfoJson = objectWriter.writeValueAsString(updatedMenuItem.nutritionInfo);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        executeUpdate(String.format(QueryTemplate.updateMenuItem,
                updatedMenuItem.price,
                updatedMenuItem.itemName,
                nutritionInfoJson,
                updatedMenuItem.category,
                updatedMenuItem.menuItemId

        ));

        // delete old inventory item association
        executeUpdate(String.format(QueryTemplate.deleteMenuItemToInventoryItem,
                updatedMenuItem.menuItemId
        ));

        // add association
        mapMenutoInventory(updatedMenuItem.menuItemId, updatedMenuItem.inventoryItems);

    }

    /**
     * Deletes menu item with given UUID
     *
     * @param menuItemId ID of menu item to be deleted
     * */
    public void deleteMenuItem(UUID menuItemId) {

        // delete inventory item association
        executeUpdate(String.format(QueryTemplate.deleteMenuItemToInventoryItem,
                menuItemId
        ));

        // delete actual menu item
        executeUpdate(String.format(QueryTemplate.deleteMenuItem,
                menuItemId
        ));
    }

    /**
     * Selects all inventory items associated with a given menu item
     *
     * @param menuItemId the UUID of the menu item to select inventory items for
     * @return a {@code List<InventoryItem>} of inventory items associated with the given menu item
     */
    public List<InventoryItem> selectMenuItemInventoryItems(UUID menuItemId) {
        List<InventoryItem> items = null;
        try {
            items = executeQuery(
                    String.format(QueryTemplate.selectMenuItemInventoryItem, menuItemId),
                    SQLToJavaMapper::inventoryItemMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

    /**
     * Selects menu item sales for designated time period
     * @param startMonth Time period start month
     * @param endMonth Time period end month
     * @param startDay Time period start day
     * @param endDay Time period end day
     * */
    public Map<String, Integer> selectSales(
            Integer startMonth,
            Integer endMonth,
            Integer startDay,
            Integer endDay
    ) {
        // Let's use `TreeMap` here so the items are ordered alphabetically in the UI
        Map<String, Integer> sales = new TreeMap<>();
        try {
            List<MenuItemWithQty> itemsWithQty = executeQuery(
                    String.format(QueryTemplate.selectMenuItemSalesByTimePeriod,
                            startMonth,
                            startDay,
                            endMonth,
                            endDay,
                            startMonth,
                            endMonth
                    ),
                    SQLToJavaMapper::menuItemWithQtyMapper
            );
            for (MenuItemWithQty item : itemsWithQty) {
                sales.put(item.menuItem.itemName, item.quantity);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return sales;
    }



}
