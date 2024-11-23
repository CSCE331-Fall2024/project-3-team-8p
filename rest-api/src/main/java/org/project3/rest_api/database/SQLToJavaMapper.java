package org.project3.rest_api.database;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.project3.rest_api.models.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * The SQLToJavaMapper class provides methods for mapping SQL ResultSet data
 * to corresponding Java objects in the Panda Express POS system.
 *
 * <p>This class includes static methods that take a ResultSet as input and
 * convert the data from the ResultSet into Java objects such as Order,
 * Employee, InventoryItem, and MenuItem. Each mapping method handles
 * SQLException to ensure that errors during the mapping process are
 * appropriately reported.</p>
 *
 * @author Kevin Zhang
 */
public class SQLToJavaMapper {


    /**
     * Maps a ResultSet row to a MenuItem object.
     *
     * @param rs the ResultSet containing the menu item data
     * @return a MenuItem object mapped from the ResultSet
     * @throws RuntimeException if an SQLException occurs during mapping
     */
    public static MenuItem menuItemMapper(ResultSet rs) {
        try {
            // Retrieve the nutritionInfo JSON string from the ResultSet
            String nutritionJson = rs.getString("nutritionInfo");
            NutritionInfo nutritionInfo = null;
            // Parse the JSON string only if it's not null or empty
            if (nutritionJson != null && !nutritionJson.isEmpty()) {
                ObjectMapper objectMapper = new ObjectMapper();
                nutritionInfo = objectMapper.readValue(nutritionJson, NutritionInfo.class);
            }
            return new MenuItem(
                    UUID.fromString(rs.getString("menuItemId")),
                    rs.getDouble("price"),
                    rs.getString("itemName"),
                    nutritionInfo
            );
        } catch (SQLException e) {
            throw new RuntimeException("Error mapping ResultSet to MenuItem", e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Maps a ResultSet row to an InventoryItem object.
     *
     * @param rs the ResultSet containing the inventory item data
     * @return an InventoryItem object mapped from the ResultSet
     * @throws RuntimeException if an SQLException occurs during mapping
     */
    public static InventoryItem inventoryItemMapper(ResultSet rs) {
        try {
            return new InventoryItem(
                    UUID.fromString(rs.getString("inventoryItemId")),
                    rs.getDouble("cost"),
                    rs.getInt("availablestock"),
                    rs.getString("itemname")
            );
        }
        catch (SQLException e) {
            throw new RuntimeException("Error mapping ResultSet to InventoryItem", e);
        }
    }

    /**
     * Maps a ResultSet row to an Employee object.
     *
     * @param rs the ResultSet containing the employee data
     * @return an Employee object mapped from the ResultSet
     * @throws RuntimeException if an SQLException occurs during mapping
     */
    public static Employee employeeMapper(ResultSet rs){
        try {
            return new Employee(
                    UUID.fromString(rs.getString("employeeId")),
                    rs.getBoolean("isManager"),
                    rs.getString("name")
            );
        }
        catch (SQLException e) {
            throw new RuntimeException("Error mapping ResultSet to InventoryItem", e);
        }
    }

    /**
     * Maps a ResultSet row to an Order object.
     *
     * @param rs the ResultSet containing the order data
     * @return an Order object mapped from the ResultSet
     * @throws RuntimeException if an SQLException occurs during mapping
     */
    public static Order orderMapper(ResultSet rs){
        try {
            return new Order(
                    UUID.fromString(rs.getString("orderId")),
                    UUID.fromString(rs.getString("cashierid")),
                    rs.getInt("month"),
                    rs.getInt("week"),
                    rs.getInt("day"),
                    rs.getInt("hour"),
                    rs.getDouble("price")
            );
        }
        catch (SQLException e) {
            throw new RuntimeException("Error mapping ResultSet to order", e);
        }
    }
}
