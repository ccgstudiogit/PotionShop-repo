package com.connor.potionshop.model.potion;

import java.util.*;
import com.connor.potionshop.model.potioningredient.*;

public record PotionWithIngredientsDTO(
        Integer id,
        String name,
        PotionType type,
        String effect,
        Integer price,
        List<PotionIngredientDTO> ingredients // PotionIngredient is used because it also includes quantity of the ingredient
) { }
