package org.project3.rest_api.models;



import java.util.List;

public class NutritionInfo {
    public List<String> allergens;
    public int calories = 0;
    public int fat = 0;
    public int protein = 0;
    public int sugar = 0;
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
