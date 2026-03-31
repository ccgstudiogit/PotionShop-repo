package com.connor.potionshop.mapper;

import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.model.potioningredient.*;
import org.springframework.stereotype.Component;

@Component
public class PotionIngredientMapper {
    /**
     * Converts a {@link PotionIngredient} entity into its corresponding
     * {@link PotionIngredientDTO} representation.
     *
     * @param potionIngredient the join entity linking a potion to an ingredient containing both ingredient details
     *                         and quantity
     * @return a DTO containing the ingredient's id, name, rarity, and quantity
     */
    public PotionIngredientDTO toDTO(PotionIngredient potionIngredient) {
        Ingredient ingredient = potionIngredient.getIngredient();
        return new PotionIngredientDTO(
            ingredient.getId(),
            ingredient.getName(),
            ingredient.getRarity(),
            potionIngredient.getQuantity()
        );
    }
}
