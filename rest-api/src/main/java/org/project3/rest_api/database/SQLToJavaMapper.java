package org.project3.rest_api.database;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.project3.rest_api.models.*;
import org.project3.rest_api.models.wrappers.InventoryItemWithQty;

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
            String nutritionJson = rs.getString("nutritionInfo");
            NutritionInfo nutritionInfo = null;
            if (nutritionJson != null && !nutritionJson.isEmpty()) {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(nutritionJson);
                JsonNode allergensNode = rootNode.path("allergens");
                if (allergensNode.isArray()) {
                    ArrayNode cleanAllergens = objectMapper.createArrayNode();
                    allergensNode.forEach(node -> {
                        if (node.isTextual()) {
                            String allergen = node.textValue().replace("[", "").replace("]", "").trim();
                            if (!allergen.isEmpty()) {
                                cleanAllergens.add(allergen);
                            }
                        }
                    });
                    ((ObjectNode) rootNode).set("allergens", cleanAllergens);
                }
                nutritionInfo = objectMapper.treeToValue(rootNode, NutritionInfo.class);
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
     * Maps a ResultSet row to an InventoryItemWithQty object.
     *
     * @param rs the ResultSet containing the inventory item and quantity data
     * @return an InventoryItemWithQty object mapped from the ResultSet
     * @throws RuntimeException if an SQLException occurs during mapping
     */
    public static InventoryItemWithQty inventoryItemWithQtyMapper(ResultSet rs) {
        try {
            return new InventoryItemWithQty(
                    new InventoryItem(
                            UUID.fromString(rs.getString("inventoryItemId")),
                            rs.getDouble("cost"),
                            rs.getInt("availableStock"),
                            rs.getString("itemName")
                    ),
                    rs.getInt("itemsUsed")
            );
        } catch (SQLException e) {
            throw new RuntimeException("Error mapping ResultSet to InventoryItemWithQty", e);
        }
    }
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
