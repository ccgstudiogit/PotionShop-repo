package com.connor.potionshop.mapper;

import java.util.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.model.potion.*;
import org.springframework.stereotype.Component;

@Component
public class PotionMapper {
    /// Map this potion to a complete Data Transfer Object.
    public PotionDTO toDTO(Potion potion) {
        return new PotionDTO(potion.getId(), potion.getName(), potion.getType(), potion.getEffect(), potion.getPrice());
    }

    /// Map a CreatePotionDTO to a new potion object.
    public Potion fromCreateDTO(CreatePotionDTO newPotion) {
        return new Potion(newPotion.name(), newPotion.type(), newPotion.effect(), newPotion.price());
    }

    /// Map a potion to a complete Data Transfer Object with a list of its ingredients.
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
