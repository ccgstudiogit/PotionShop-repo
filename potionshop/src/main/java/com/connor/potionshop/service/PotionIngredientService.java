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

    public PotionIngredientService(
        PotionIngredientRepository potionIngredientRepository,
        PotionRepository potionRepository,
        IngredientRepository ingredientRepository
    ) {
        this.potionIngredientRepository = potionIngredientRepository;
        this.potionRepository = potionRepository;
        this.ingredientRepository = ingredientRepository;
    }

    /**
     * Retrieves all PotionIngredient entries associated with the given potion id.
     *
     * @param id The id of the potion.
     * @return A list of PotionIngredient entities linked to the potion.
     */
    public List<PotionIngredient> getPotionIngredientsByPotionId(Integer id) {
        return potionIngredientRepository.findByPotionId(id);
    }

    /**
     * Retrieves all PotionIngredient entries associated with the given ingredient id.
     *
     * @param id The id of the ingredient.
     * @return A list of PotionIngredient entities linked to the ingredient.
     */
    public List<PotionIngredient> getPotionIngredientsByIngredientId(Integer id) {
        return potionIngredientRepository.findByIngredientId(id);
    }

    /**
     * Retrieves a Potion entity by its id.
     *
     * @param id The id of the potion to retrieve.
     * @return The Potion entity.
     * @throws EntityNotFoundException If no potion exists with the given id.
     */
    public Potion getPotionById(Integer id) {
        return potionRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Potion with id %d not found", id)
            ));
    }

    /**
     * Retrieves an Ingredient entity by its id.
     *
     * @param id The id of the ingredient to retrieve.
     * @return The Ingredient entity.
     * @throws EntityNotFoundException If no ingredient exists with the given id.
     */
    public Ingredient getIngredientById(Integer id) {
        return ingredientRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Ingredient with id %d not found", id)
            ));
    }

    /**
     * Saves a new PotionIngredient entry to the database.
     *
     * <p>The composite primary key is checked to ensure the relationship does not already exist.</p>
     *
     * @param potionIngredient The join entity to save.
     * @return The saved PotionIngredient entity.
     * @throws EntityExistsException If the potion already contains the ingredient.
     */
    public PotionIngredient addPotionIngredient(PotionIngredient potionIngredient) {
        checkAndThrowIfPotionIngredientExists(potionIngredient.getId());
        return potionIngredientRepository.save(potionIngredient);
    }

    /**
     * Checks whether a PotionIngredient with the given composite key already exists.
     *
     * @param id The composite primary key (potionId, ingredientId).
     * @throws EntityExistsException If the relationship already exists.
     */
    public void checkAndThrowIfPotionIngredientExists(PotionIngredientPk id) {
        if (potionIngredientRepository.existsById(id)) {
            throw new EntityExistsException(
                String.format("Potion %d already has ingredient %d.",
                    id.getPotionId(),
                    id.getIngredientId()
                )
            );
        }
    }

    /**
     * Deletes a PotionIngredient entry identified by its composite key.
     *
     * @param potionId The id of the potion.
     * @param ingredientId The id of the ingredient.
     * @throws EntityNotFoundException If the relationship does not exist.
     */
    public void deletePotionIngredient(Integer potionId, Integer ingredientId) {
        PotionIngredientPk id = new PotionIngredientPk(potionId, ingredientId);
        checkAndThrowIfPotionIngredientNotExists(id);

        potionIngredientRepository.deleteById(id);
    }

    /**
     * Updates the attributes of an existing PotionIngredient entry.
     *
     * @param potionId The id of the potion.
     * @param ingredientId The id of the ingredient.
     * @param updatedPotionIngredient The new quantity values.
     * @return The updated PotionIngredient entity.
     * @throws EntityNotFoundException If the relationship does not exist.
     */
    public PotionIngredient updatePotionIngredient(Integer potionId, Integer ingredientId, UpdatePotionIngredientDTO updatedPotionIngredient) {
        PotionIngredientPk id = new PotionIngredientPk(potionId, ingredientId);
        checkAndThrowIfPotionIngredientNotExists(id);

        PotionIngredient updated = potionIngredientRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format(
                    "Potion %d does not have ingredient %d.",
                    id.getPotionId(),
                    id.getIngredientId()
                )
            ));

        updated.setQuantity(updatedPotionIngredient.quantity());
        potionIngredientRepository.save(updated);
        return updated;
    }

    /**
     * Ensures that a PotionIngredient with the given composite key exists.
     *
     * @param id The composite primary key (potionId, ingredientId).
     * @throws EntityNotFoundException If the relationship does not exist.
     */
    public void checkAndThrowIfPotionIngredientNotExists(PotionIngredientPk id) {
        if (!potionIngredientRepository.existsById(id)) {
            throw new EntityNotFoundException(
                String.format(
                    "Potion %d does not have ingredient %d.",
                    id.getPotionId(),
                    id.getIngredientId()
                )
            );
        }
    }
}
