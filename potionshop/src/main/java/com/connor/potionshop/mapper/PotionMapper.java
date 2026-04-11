package com.connor.potionshop.mapper;

import java.util.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.model.potion.*;
import org.springframework.stereotype.Component;

@Component
public class PotionMapper {
    /**
     * Converts a {@link Potion} entity into its corresponding {@link PotionDTO} representation.
     *
     * @param potion the potion entity to convert
     * @return a DTO containing the potion's core identifying and descriptive fields
     */
    public PotionDTO toDTO(Potion potion) {
        return new PotionDTO(potion.getId(), potion.getName(), potion.getType(), potion.getEffect(), potion.getPrice());
    }

    /**
     * Creates a new {@link Potion} entity from the provided {@link CreatePotionDTO}.
     *
     * <p>This method is typically used when handling potion creation requests from the API layer. The id is not set here
     * and will be assigned by the persistence layer upon saving.</p>
     *
     * @param newPotion the DTO containing the data required to create a new potion
     * @return a new Potion entity initialized with the provided name, type, effect, and price
     */
    public Potion fromCreateDTO(CreatePotionDTO newPotion) {
        return new Potion(newPotion.name(), newPotion.type(), newPotion.effect(), newPotion.price());
    }

    /**
     * Creates a new {@link Potion} entity from the provided {@link CreatePotionWithIngDTO}.
     *
     * <p>This method is typically used when handling potion creation requests from the API layer. The id is not set here
     * and will be assigned by the persistence layer upon saving. The ingredients are ignored and only th potion object
     * is generated.</p>
     *
     * @param newPotion the DTO containing the data required to create a new potion
     * @return a new Potion entity initialized with the provided name, type, effect, and price (ingredients ignored)
     */
    public Potion fromCreateDTO(CreatePotionWithIngDTO newPotion) {
        return new Potion(newPotion.name(), newPotion.type(), newPotion.effect(), newPotion.price());
    }

    /**
     * Converts a {@link Potion} entity into a {@link PotionWithIngredientsDTO}, including its associated list of ingredient DTOs.
     *
     * @param potion the potion entity to convert
     * @param ingredients a list of ingredient DTOs associated with the potion
     * @return a DTO containing the potion's details along with its ingredient list
     */
    public PotionWithIngredientsDTO toWithIngredientsDTO(Potion potion, List<PotionIngredientDTO> ingredients) {
        return new PotionWithIngredientsDTO(
            potion.getId(),
            potion.getName(),
            potion.getType(),
            potion.getEffect(),
            potion.getPrice(),
            ingredients
        );
    }
}
