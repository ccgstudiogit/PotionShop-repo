package com.connor.potionshop.model.potioningredient;

import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.ingredient.*;

public record PotionIngredientDTO(
    Integer ingredientId,
    String name,
    Rarity rarity,
    Integer quantity
) { }
