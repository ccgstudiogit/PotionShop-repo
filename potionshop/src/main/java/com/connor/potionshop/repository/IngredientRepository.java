package com.connor.potionshop.repository;

import com.connor.potionshop.model.ingredient.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer>, JpaSpecificationExecutor<Ingredient> {
    boolean existsByNameAndRarity(String name, Rarity rarity);
}
