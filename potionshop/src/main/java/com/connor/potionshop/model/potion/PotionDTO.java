package com.connor.potionshop.model.potion;

/// Potion data transfer object. Can be used to hide information and freely edit information that's sent to the frontend
/// without worrying about impacting backend logic.
public record PotionDTO(Integer id,
                        String name,
                        PotionType type,
                        String effect,
                        Integer price
) { }
