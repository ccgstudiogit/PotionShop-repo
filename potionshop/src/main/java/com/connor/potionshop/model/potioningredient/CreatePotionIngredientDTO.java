package com.connor.potionshop.model.potioningredient;

/// Represents the body of a request to add an ingredient to a potion. The potionId is *not* included here because it is
/// supplied by the URL in the endpoint in PotionController: potions/{id}/ingredients, where {id} is the incoming potion's id.
public record CreatePotionIngredientDTO(
    Integer ingredientId,
    Integer quantity
) { }
