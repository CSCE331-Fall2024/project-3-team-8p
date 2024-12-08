package org.project3.rest_api.models;
import java.util.List;
/**
 * The NutritionInfo class represents the nutritional information for a menu item in the Panda Express POS system.
 * It stores information about the menu item's allergens, calories, fat, protein, sugar, and carbohydrates.
 * <p>This class includes attributes for allergens, calories, fat, protein, sugar, carbohydrates, premium status, and spicy status.</p>
 * <p>Author: Kevin Zhang</p>
 * <p>Author: Soham Nagawanshi</p>
 * <p>Author: Ryan Kha</p>
 */
public class NutritionInfo {

    /**
     * Menu item's allergens
     * */
    public List<String> allergens;

    /**
     * Menu item's calories
     * */
    public int calories = 0;

    /**
     * Menu item's grams of fat
     * */
    public int fat = 0;

    /**
     * Menu item's grams of protein
     * */
    public int protein = 0;

    /**
     * Menu item's grams of sugar
     * */
    public int sugar = 0;

    /**
     * Menu item's grams of carbs
     * */
    public int carbohydrates = 0;

    /**
     * Menu item's premium status
     * */
    public boolean isPremium = false;

    /**
     * Menu item's spicy status
     * */
    public boolean isSpicy = false;


    /**
     * Default constructor for deserialization
     * */
    public NutritionInfo() {}


    /**
     * Attribute constructor
     * */
    public NutritionInfo(List<String> allergens,
                         int calories,
                         int fat,
                         int protein,
                         int sugar,
                         int carbohydrates,
                         boolean isPremium,
                         boolean isSpicy) {
        this.allergens = allergens;
        this.calories = calories;
        this.fat = fat;
        this.protein = protein;
        this.sugar = sugar;
        this.carbohydrates = carbohydrates;
        this.isPremium = isPremium;
        this.isSpicy = isSpicy;
    }
}
