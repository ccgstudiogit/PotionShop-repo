package com.connor.potionshop.mapper;

import com.connor.potionshop.model.potion.*;
import org.springframework.stereotype.Component;

@Component
public class PotionMapper {

    /// Map this potion to a complete Data Transfer Object.
    public PotionDTO mapToDTO(Potion potion) {
        return new PotionDTO(potion.getId(), potion.getName(), potion.getType(), potion.getEffect(), potion.getPrice());
    }

    /// Map a CreatePotionDTO to a new potion object.
    public Potion fromCreateDTO(CreatePotionDTO newPotion) {
        return new Potion(newPotion.name(), newPotion.type(), newPotion.effect(), newPotion.price());
    }
}
