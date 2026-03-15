package com.connor.potionshop.mapper;

import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.model.potioningredient.*;
import org.springframework.stereotype.Component;

@Component
public class PotionIngredientMapper {
    /// Map a PotionIngredient object to its Data Transfer Object equivalent.
    public PotionIngredientDTO mapToDTO(PotionIngredient potionIngredient) {
        Ingredient ingredient = potionIngredient.getIngredient();
        return new PotionIngredientDTO(
                ingredient.getId(),
                ingredient.getName(),
                ingredient.getRarity(),
                potionIngredient.getQuantity()
        );
    }
}
