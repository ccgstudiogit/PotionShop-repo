package com.connor.potionshop.model.potion;

import com.connor.potionshop.model.potioningredient.CreatePotionIngredientDTO;
import java.util.*;

public record CreatePotionWithIngDTO(
    String name,
    PotionType type,
    String effect,
    Integer price,
    List<CreatePotionIngredientDTO> ingredients
) { }
