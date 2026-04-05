package com.connor.potionshop.repository;

import java.util.*;
import com.connor.potionshop.model.potion.Potion;
import com.connor.potionshop.model.potioningredient.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PotionIngredientRepository extends JpaRepository<PotionIngredient, PotionIngredientPk> {
    List<PotionIngredient> findByPotionId(Integer id);
}
