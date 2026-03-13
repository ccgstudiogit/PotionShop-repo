package com.connor.potionshop.repository;

import com.connor.potionshop.model.ingredient.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> { }
