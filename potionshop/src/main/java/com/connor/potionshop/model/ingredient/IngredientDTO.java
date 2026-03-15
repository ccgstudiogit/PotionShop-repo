package com.connor.potionshop.model.ingredient;

public record IngredientDTO(
    Integer id,
    String name,
    Rarity rarity
) { }
