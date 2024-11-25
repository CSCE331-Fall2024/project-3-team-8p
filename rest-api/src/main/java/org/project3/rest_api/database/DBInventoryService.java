package org.project3.rest_api.database;


import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.wrappers.InventoryItemWithQty;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

/**
 * Implements inventory-related database actions
 * */
@Repository
public class DBInventoryService extends DBConnector {
    /**
     * Selects all inventory items
     *
     * @return a {@code List<InventoryItem>} of all inventory items
     */
    public List<InventoryItem> selectInventoryItems() {
        List<InventoryItem> items = null;
        try {
            items = executeQuery(
                    String.format(QueryTemplate.selectAllInventoryItems),
                    SQLToJavaMapper::inventoryItemMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

    /**
     * Adds a new inventory item
     *
     * @param newInventoryItem the inventory item to add
     */
    public void insertInventoryItem(InventoryItem newInventoryItem) {
        executeUpdate(String.format(QueryTemplate.insertInventoryItem,
                newInventoryItem.inventoryItemId,
                newInventoryItem.cost,
                newInventoryItem.availableStock,
                newInventoryItem.itemName
        ));
    }

    /**
     * Updates an existing inventory item
     *
     * @param updatedInventoryItem an {@code InventoryItem} object containing an inventory item's updated information
     */
    public void updateInventoryItem(InventoryItem updatedInventoryItem) {
        executeUpdate(String.format(QueryTemplate.updateInventoryItem,
                updatedInventoryItem.cost,
                updatedInventoryItem.availableStock,
                updatedInventoryItem.itemName,
                updatedInventoryItem.inventoryItemId
        ));
    }

    /**
     * Deletes an employee with given UUID
     * @param invItemId ID of menu item to be deleted
     * */
    public void deleteInventoryItem(UUID invItemId) {
        executeUpdate(String.format(QueryTemplate.deleteInventoryItem,
                invItemId
        ));
    }

    /**
     * Decreases quantity of inventory item
     *
     * @param inventoryItemId ID of inventory item to update
     * @param decreaseBy How much to subtract from inventory item stock
     * */
    public void decreaseInventoryItemQty(UUID inventoryItemId, int decreaseBy) {
        executeUpdate(String.format(QueryTemplate.decreaseInventoryItemQty,
                decreaseBy,
                inventoryItemId
        ));
    }

    /**
     * Returns inventory item usage for designated time period
     *
     *
     * @param startMonth Time period start month
     * @param endMonth Time period end month
     * @param startDay Time period start day
     * @param endDay Time period end day
     * */
    public Map<String, Integer> selectProductUsage(
            Integer startMonth,
            Integer endMonth,
            Integer startDay,
            Integer endDay
    ) {
        Map<String, Integer> productUsage = new TreeMap<>();
        try {
            List<InventoryItemWithQty> menuItemToInventoryItems = executeQuery(
                    String.format(QueryTemplate.selectInventoryUseByTimePeriod,
                            startMonth,
                            startDay,
                            endMonth,
                            endDay,
                            startMonth,
                            endMonth
                    ),
                    SQLToJavaMapper::inventoryItemWithQtyMapper
            );
            for (InventoryItemWithQty item : menuItemToInventoryItems) {
                productUsage.put(item.inventoryItem.itemName, item.quantity);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return productUsage;
    }
}
