package org.project3.rest_api.models;



import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collections;
import java.util.List;

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
