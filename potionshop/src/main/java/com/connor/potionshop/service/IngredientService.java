package com.connor.potionshop.service;

import java.util.*;
import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.repository.IngredientRepository;
import com.connor.potionshop.mapper.IngredientMapper;
import jakarta.persistence.*;
import org.springframework.stereotype.*;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    private final IngredientMapper ingredientMapper;
    private final PotionIngredientService potionIngredientService;

    public IngredientService(
        IngredientRepository ingredientRepository,
        IngredientMapper ingredientMapper,
        PotionIngredientService potionIngredientService
    ) {
        this.ingredientRepository = ingredientRepository;
        this.ingredientMapper = ingredientMapper;
        this.potionIngredientService = potionIngredientService;
    }

    /**
     * Returns a list of all ingredients as Data Transfer Objects.
     *
     * @return a list of IngredientDTOs representing all ingredients in the database.
     */
    public List<IngredientDTO> getAllIngredients() {
        return ingredientRepository.findAll().stream().map(ingredientMapper::toDTO).toList();
    }

    /**
     * Retrieves an ingredient by its id and returns it as a Data Transfer Object.
     *
     * @param id the id of the ingredient to retrieve.
     * @return the IngredientDTO representing the requested ingredient.
     * @throws EntityNotFoundException if no ingredient exists with the given id.
     */
    public IngredientDTO getIngredientById(Integer id) {
        Ingredient ingredient = ingredientRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Ingredient with id %d not found.", id)
            ));

        return ingredientMapper.toDTO(ingredient);
    }

    /**
     * Creates and saves a new ingredient based on the provided creation DTO.
     *
     * <p>Before saving, this method checks whether an ingredient with the same name and rarity already exists.</p>
     *
     * @param createIngredientDTO the data used to create the new ingredient.
     * @return the newly created IngredientDTO.
     * @throws EntityExistsException if an ingredient with the same name and rarity already exists.
     */
    public IngredientDTO addIngredient(CreateIngredientDTO createIngredientDTO) {
        Ingredient newIngredient = ingredientMapper.fromCreateDTO(createIngredientDTO);
        checkAndThrowIfIngredientExists(newIngredient);

        ingredientRepository.save(newIngredient);
        return ingredientMapper.toDTO(newIngredient);
    }

    /**
     * Deletes an ingredient from the database by its id. Also deletes any associated PotionIngredient.
     *
     * @param id the id of the ingredient to delete.
     * @throws EntityNotFoundException if no ingredient exists with the given id.
     */
    public void deleteIngredientById(Integer id) {
        Ingredient ingredient = ingredientRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Ingredient with id %d not found.", id)
            ));

        // Make sure to delete this ingredient from a potion's ingredient list if that potion has this ingredient
        List<PotionIngredient> potionIngredients = potionIngredientService.getPotionIngredientsByIngredientId(id);
        for (int i = 0; i < potionIngredients.size(); i++) {
            potionIngredientService.deletePotionIngredient(potionIngredients.get(i).getPotion().getId(), id);
        }

        ingredientRepository.deleteById(id);
    }

    /**
     * Updates an ingredient's name and/or rarity by its id.
     *
     * <p>After applying updates, this method verifies that the resulting ingredient does not duplicate an existing
     * name–rarity combination.</p>
     *
     * @param id the id of the ingredient to update.
     * @param updatedIngredient the new name and rarity values.
     * @return the updated IngredientDTO.
     * @throws EntityNotFoundException if no ingredient exists with the given id.
     * @throws EntityExistsException if the updated ingredient conflicts with an existing one.
     */
    public IngredientDTO updateIngredientById(Integer id, UpdateIngredientDTO updatedIngredient) {
        Ingredient ingredient = ingredientRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Ingredient with id %d not found. Unable to update.", id)
            ));

        ingredient.setName(updatedIngredient.name());
        ingredient.setRarity(updatedIngredient.rarity());
        checkAndThrowIfIngredientExists(ingredient); // Make sure the ingredient after the updates doesn't already exist

        ingredientRepository.save(ingredient);
        return ingredientMapper.toDTO(ingredient);
    }

    /**
     * Checks whether an ingredient with the same name and rarity already exists.
     *
     * @param ingredient the ingredient to validate.
     * @throws EntityExistsException if an ingredient with the same name and rarity already exists.
     */
    public void checkAndThrowIfIngredientExists(Ingredient ingredient) {
        if (ingredientRepository.existsByNameAndRarity(ingredient.getName(), ingredient.getRarity())) {
            throw new EntityExistsException(
                String.format(
                    "Ingredient %s with %s rarity already exists.",
                    ingredient.getName(),
                    ingredient.getRarity()
                )
            );
        }
    }
}
