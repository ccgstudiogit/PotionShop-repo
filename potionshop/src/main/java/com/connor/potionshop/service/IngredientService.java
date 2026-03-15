package com.connor.potionshop.service;

import java.util.*;
import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.repository.IngredientRepository;
import com.connor.potionshop.mapper.IngredientMapper;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.*;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    private final IngredientMapper ingredientMapper;

    public IngredientService(IngredientRepository ingredientRepository, IngredientMapper ingredientMapper) {
        this.ingredientRepository = ingredientRepository;
        this.ingredientMapper = ingredientMapper;
    }

    /// Get a list of all ingredients as Data Transfer Objects.
    public List<IngredientDTO> getAllIngredients() {
        return ingredientRepository.findAll().stream().map(ingredientMapper::toDTO).toList();
    }

    /// Get an ingredient by its id.
    public IngredientDTO getIngredientById(Integer id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id + " not found."));
        return ingredientMapper.toDTO(ingredient);
    }

    /// Add an ingredient to the database and save it.
    public IngredientDTO addIngredient(CreateIngredientDTO createIngredientDTO) {
        Ingredient newIngredient = ingredientMapper.fromCreateDTO(createIngredientDTO);
        checkAndThrowIfIngredientExists(newIngredient);

        ingredientRepository.save(newIngredient);
        return ingredientMapper.toDTO(newIngredient);
    }

    /// Delete an ingredient from the database by its id.
    public void deleteIngredientById(Integer id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Ingredient with id %d not found.", id)));
        ingredientRepository.deleteById(id);
    }

    /// Update an ingredient's name and/or rarity by its id.
    public IngredientDTO updateIngredientById(Integer id, UpdateIngredientDTO updatedIngredient) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Ingredient with id %d not found. Unable to update.", id)));

        ingredient.setName(updatedIngredient.name());
        ingredient.setRarity(updatedIngredient.rarity());
        checkAndThrowIfIngredientExists(ingredient); // Make sure the ingredient after the updates doesn't already exist

        ingredientRepository.save(ingredient);
        return ingredientMapper.toDTO(ingredient);
    }

    /// Check if an ingredient already contains the name + rarity combination of another ingredient currently in the database.
    /// If it already exists, throw an EntityExistsException.
    public void checkAndThrowIfIngredientExists(Ingredient ingredient) {
        if (ingredientRepository.existsByNameAndRarity(ingredient.getName(), ingredient.getRarity())) {
            throw new EntityExistsException(String.format("Ingredient %s with %s rarity already exists.", ingredient.getName(), ingredient.getRarity()));
        }
    }
}
