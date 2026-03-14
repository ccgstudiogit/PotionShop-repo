package com.connor.potionshop.repository;

import com.connor.potionshop.model.potioningredient.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PotionIngredientRepository extends JpaRepository<PotionIngredient, PotionIngredientPk> {
}
