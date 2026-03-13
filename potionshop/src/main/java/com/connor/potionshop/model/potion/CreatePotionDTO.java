package com.connor.potionshop.model.potion;

public record CreatePotionDTO(String name,
                              PotionType type,
                              String effect,
                              Integer price
) { }
