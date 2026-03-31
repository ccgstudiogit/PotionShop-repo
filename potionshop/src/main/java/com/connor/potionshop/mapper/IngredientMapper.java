package com.connor.potionshop.mapper;

import com.connor.potionshop.model.ingredient.*;
import org.springframework.stereotype.Component;

@Component
public class IngredientMapper {
    /**
     * Converts an {@link Ingredient} entity into its corresponding
     * {@link IngredientDTO} representation.
     *
     * @param ingredient the ingredient entity to convert
     * @return a DTO containing the ingredient's id, name, and rarity
     */
    public IngredientDTO toDTO(Ingredient ingredient) {
        return new IngredientDTO(ingredient.getId(), ingredient.getName(), ingredient.getRarity());
    }

    /**
     * Creates a new {@link Ingredient} entity from the provided
     * {@link CreateIngredientDTO}.
     *
     * @param createIngredientDTO the DTO containing the data needed to create a new ingredient
     * @return a new Ingredient entity initialized with the provided name and rarity
     */
    public Ingredient fromCreateDTO(CreateIngredientDTO createIngredientDTO) {
        return new Ingredient(createIngredientDTO.name(), createIngredientDTO.rarity());
    }
}
