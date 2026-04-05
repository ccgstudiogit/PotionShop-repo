package com.connor.potionshop.seeder;

import java.util.List;
import com.connor.potionshop.repository.*;
import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.model.potioningredient.*;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
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

    /**
     * Handles seeding the database with sample data if BOTH of the potion and ingredient tables are empty.
     */
    @EventListener(ApplicationReadyEvent.class)
    public void onStartup() {
        try {
            if (potionRepository.count() == 0 && ingredientRepository.count() == 0) {
                // Save the potions and ingredients to the database first. This is critical because PotionIngredient needs both
                // potion and ingredient id's to form its composite PK. Only then can each potion's ingredient be linked to it
                // via the PotionIngredient table
                List<Potion> savedPotions = potionRepository.saveAll(SeedData.getPotionSeedData());
                List<Ingredient> savedIngredients = ingredientRepository.saveAll(SeedData.getIngredientSeedData());

                List<PotionIngredient> potionIngredients =
                    potionIngredientRepository.saveAll(SeedData.getPotionIngredientSeedData(savedPotions, savedIngredients));

                System.out.println("Both potion and ingredient tables were empty. Database successfully seeded with sample data.");
            }
        } catch (Exception e) {
            System.out.println("ERROR: Unable to seed database. " + e.getMessage());
        }
    }
}
