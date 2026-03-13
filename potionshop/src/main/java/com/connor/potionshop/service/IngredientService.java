package com.connor.potionshop.service;

import java.util.*;
import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.repository.IngredientRepository;
import com.connor.potionshop.mapper.IngredientMapper;
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
        return ingredientRepository.findAll().stream().map(ingredientMapper::mapToDTO).toList();
    }

    /// Get an ingredient by its id.
    public IngredientDTO getIngredientById(Integer id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id + " not found"));
        return ingredientMapper.mapToDTO(ingredient);
    }
}
