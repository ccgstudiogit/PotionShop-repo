package com.connor.potionshop.mapper;

import com.connor.potionshop.model.potion.*;
import org.springframework.stereotype.Component;

@Component
public class PotionMapper {

    /// Map this potion to a complete Data Transfer Object.
    public PotionDTO mapToDTO(Potion potion) {
        return new PotionDTO(potion.getId(), potion.getName(), potion.getType(), potion.getEffect(), potion.getPrice());
    }
}
