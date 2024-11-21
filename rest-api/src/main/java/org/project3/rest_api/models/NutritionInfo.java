package org.project3.rest_api.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class NutritionInfo {
    @JsonProperty("allergens")
    public List<String> allergens;
    @JsonProperty("calories")
    public int calories = 0;
    @JsonProperty("fat")
    public int fat = 0;
    @JsonProperty("protein")
    public int protein = 0;
    @JsonProperty("sugar")
    public int sugar = 0;
    @JsonProperty("carbohydrates")
    public int carbohydrates = 0;
    public boolean isPremium = false;

    public NutritionInfo() {}

    // Constructor
    public NutritionInfo(List<String> allergens, int calories, int fat, int protein, int sugar, int carbohydrates, boolean isPremium) {
        this.allergens = allergens;
        this.calories = calories;
        this.fat = fat;
        this.protein = protein;
        this.sugar = sugar;
        this.carbohydrates = carbohydrates;
        this.isPremium = isPremium;
    }
}
