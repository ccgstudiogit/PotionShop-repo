package com.connor.potionshop.service;

import com.connor.potionshop.repository.IngredientRepository;
import org.springframework.stereotype.*;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }


}
