package com.connor.potionshop.mapper;

import com.connor.potionshop.model.ingredient.*;
import org.springframework.stereotype.Component;

@Component
public class IngredientMapper {
    /// Map an ingredient object to its Data Transfer Object equivalent.
    public IngredientDTO toDTO(Ingredient ingredient) {
        return new IngredientDTO(ingredient.getId(), ingredient.getName(), ingredient.getRarity());
    }

    /// Create and return a new Ingredient object from a CreateIngredientDTO.
    public Ingredient fromCreateDTO(CreateIngredientDTO createIngredientDTO) {
        return new Ingredient(createIngredientDTO.name(), createIngredientDTO.rarity());
    }
}
