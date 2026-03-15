package com.connor.potionshop.service;

import java.util.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.repository.PotionIngredientRepository;
import org.springframework.stereotype.Service;

@Service
public class PotionIngredientService {
    private final PotionIngredientRepository potionIngredientRepository;

    public PotionIngredientService(PotionIngredientRepository potionIngredientRepository) {
        this.potionIngredientRepository = potionIngredientRepository;
    }

    /// Get a list of PotionIngredient from a potion. The potion is fetched by its id.
    public List<PotionIngredient> getIngredientsByPotionId(Integer id) {
        return potionIngredientRepository.findByPotionId(id);
    }
}
