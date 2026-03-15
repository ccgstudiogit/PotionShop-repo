package com.connor.potionshop.service;

import java.util.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.repository.*;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;

/// This service acts as a join-table to Potion and Ingredient. Because of this, PotionIngredientService has access to the
/// PotionIngredient repository, Potion repository, and Ingredient repository. This service acts a bridge between potions
/// and their ingredients. This also differs from PotionService and IngredientService since both of those services methods'
/// return DTOs, while PotionIngredientService can return actual Potion and Ingredient objects.
@Service
public class PotionIngredientService {
    private final PotionIngredientRepository potionIngredientRepository;
    private final PotionRepository potionRepository;
    private final IngredientRepository ingredientRepository;

    public PotionIngredientService(PotionIngredientRepository potionIngredientRepository,
                                   PotionRepository potionRepository,
                                   IngredientRepository ingredientRepository
    ) {
        this.potionIngredientRepository = potionIngredientRepository;
        this.potionRepository = potionRepository;
        this.ingredientRepository = ingredientRepository;
    }

    /// Get a list of PotionIngredient from a potion. The potion is fetched by its id.
    public List<PotionIngredient> getIngredientsByPotionId(Integer id) {
        return potionIngredientRepository.findByPotionId(id);
    }

    /// Get an ingredient object by its id.
    public Ingredient getIngredientById(Integer id) {
        return ingredientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Ingredient with id %d not found", id)));
    }
}
