package com.connor.potionshop.seeder;

import com.connor.potionshop.repository.*;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.*;
import org.springframework.stereotype.*;

@Component
public class DatabaseSeeder {
    private final PotionRepository potionRepository;
    private final IngredientRepository ingredientRepository;
    private final PotionIngredientRepository potionIngredientRepository;

    public DatabaseSeeder(
        PotionRepository potionRepository,
        IngredientRepository ingredientRepository,
        PotionIngredientRepository potionIngredientRepository
    ) {
        this.potionRepository = potionRepository;
        this.ingredientRepository = ingredientRepository;
        this.potionIngredientRepository = potionIngredientRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onStartup() {
        if (potionRepository.count() == 0 && ingredientRepository.count() == 0) {
            System.out.println("counts are 0");
            System.out.println("Seeding database!");
        } else {
            System.out.println("counts are good");
        }
    }
}
