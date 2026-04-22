package com.connor.potionshop.mapper;

import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.model.potion.*;
import org.springframework.stereotype.Component;

@Component
public class PotionIngredientMapper {
    /**
     * Converts a {@link PotionIngredient} entity into its corresponding {@link PotionIngredientDTO} representation.
     *
     * @param potionIngredient the join entity linking a potion to an ingredient containing both ingredient details
     *                         and quantity.
     * @return a DTO containing the ingredient's id, name, rarity, and quantity.
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

    /**
     * Converts a {@link PotionIngredient} entity into its corresponding {@link UpdatePotionIngredientDTO} representation.
     *
     * @param potionIngredient the join entity linking a potion to an ingredient containing both ingredient details
     *                         and quantity.
     * @return a DTO containing the ingredient's id, name, rarity, and quantity.
     */
    public UpdatePotionIngredientDTO toUpdateDTO(PotionIngredient potionIngredient) {
        return new UpdatePotionIngredientDTO(potionIngredient.getQuantity());
    }

    /**
     * Creates a {@link PotionIngredient} join entity from a {@link CreatePotionIngredientDTO}, associating it with the
     * given {@link Potion} and {@link Ingredient} entities.
     *
     * @param createPotionIngredientDTO The DTO containing the ingredient ID and quantity specified by the client.
     * @param potion The potion entity that this ingredient will be linked to.
     * @param ingredient The ingredient entity referenced by the DTO's ingredientId.
     * @return A new {@link PotionIngredient} entity representing the relationship between the potion and ingredient
     *         with the specified quantity.
     */
    public PotionIngredient fromCreateDTO(CreatePotionIngredientDTO createPotionIngredientDTO, Potion potion, Ingredient ingredient) {
        return new PotionIngredient(potion, ingredient, createPotionIngredientDTO.quantity());
    }
}
