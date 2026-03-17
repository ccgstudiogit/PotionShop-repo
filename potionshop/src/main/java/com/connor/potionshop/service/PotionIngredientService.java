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

    /// Get a list of PotionIngredient from a potion. The potion is fetched by its id.
    public List<PotionIngredient> getIngredientsByPotionId(Integer id) {
        return potionIngredientRepository.findByPotionId(id);
    }

    /// Get a potion object by its id.
    public Potion getPotionById(Integer id) {
        return potionRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Potion with id %d not found", id)
            ));
    }

    /// Get an ingredient object by its id.
    public Ingredient getIngredientById(Integer id) {
        return ingredientRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Ingredient with id %d not found", id)
            ));
    }

    /// Add and save a potion ingredient object to the database.
    public PotionIngredient addPotionIngredient(PotionIngredient potionIngredient) {
        checkAndThrowIfPotionIngredientExists(potionIngredient.getId());
        return potionIngredientRepository.save(potionIngredient);
    }

    /// Check if a PotionIngredient already exists in the database (the composite PK is used). If so, throw an EntityExistsException.
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

    /// Delete a PotionIngredient row from the database. The primary key is formed from the potionId and ingredientId. If the
    /// PotionIngredient with that pk does not exist in the database, an EntityNotFoundException is thrown.
    public void deletePotionIngredient(Integer potionId, Integer ingredientId) {
        PotionIngredientPk id = new PotionIngredientPk(potionId, ingredientId);
        checkAndThrowIfPotionIngredientNotExists(id);

        potionIngredientRepository.deleteById(id);
    }

    /// Update a potion ingredient's attributes.
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

    /// Check if a PotionIngredient doesn't exist in the database (the composite PK is used). If not, throw an EntityNotExistsException.
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
