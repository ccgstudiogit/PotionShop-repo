package com.connor.potionshop.model.potion;

public record UpdatePotionDTO(
    String name,
    PotionType type,
    String effect,
    Integer price
) { }
