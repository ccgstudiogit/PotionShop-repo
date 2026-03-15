package com.connor.potionshop.service;

import java.util.*;

import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.mapper.*;
import com.connor.potionshop.repository.*;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;

// Service makes this class available as a service to be used within other classes. Services handle the business logic
@Service
public class PotionService {
    private final PotionRepository potionRepository;
    private final PotionMapper potionMapper;
    private final PotionIngredientRepository potionIngredientRepository;
    private final PotionIngredientMapper potionIngredientMapper;

    public PotionService(PotionRepository potionRepository,
                         PotionIngredientRepository potionIngredientRepository,
                         PotionMapper potionMapper,
                         PotionIngredientMapper potionIngredientMapper
    ) {
        this.potionRepository = potionRepository;
        this.potionMapper = potionMapper;
        this.potionIngredientRepository = potionIngredientRepository;
        this.potionIngredientMapper = potionIngredientMapper;
    }

    /// Get a list of potions currently stored in the database.
    public List<PotionDTO> getAllPotions() {
        // Mapper can be used to hide sensitive data from frontend
        return potionRepository.findAll().stream().map(potionMapper::toDTO).toList();
    }

    /// Get a potion by its id. Also includes a list of the potion's ingredients.
    public PotionWithIngredientsDTO getPotionById(Integer id) {
        Potion potion = potionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Potion with id %d not found.", id)));

        List<PotionIngredientDTO> ingredients = getAllPotionIngredientsById(potion.getId());
        return potionMapper.toWithIngredientsDTO(potion, ingredients);
    }

    /// Add a potion to the database and save it. A PotionDTO is returned if the potion was successfully added.
    public PotionDTO addPotion(CreatePotionDTO createPotionDTO) {
        Potion newPotion = potionMapper.fromCreateDTO(createPotionDTO);
        checkAndThrowIfPotionExists(newPotion);

        potionRepository.save(newPotion);
        return potionMapper.toDTO(newPotion);
    }

    /// Remove a potion from the database.
    public void deletePotionById(Integer id) {
        Potion potion = potionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Potion with id %d not found.", id)));
        potionRepository.deleteById(id);
    }

    /// Update a potion based on the potion's id. The current potion tied to this id will have its data replaced by the updated
    /// potion DTO.
    public PotionDTO updatePotionById(Integer id, UpdatePotionDTO updatedPotion) {
        Potion potion = potionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Potion with id %d not found. Unable to update.", id)));

        potion.setName(updatedPotion.name());
        potion.setType(updatedPotion.type());
        potion.setEffect(updatedPotion.effect());
        potion.setPrice(updatedPotion.price());
        checkAndThrowIfPotionExists(potion); // Verify the potion's updated values are not already in the database

        potionRepository.save(potion);
        return potionMapper.toDTO(potion);
    }

    /// Check if a potion of the same name and type already exists in the database. If so, throw an EntityExistsException.
    public void checkAndThrowIfPotionExists(Potion potion) {
        if (potionRepository.existsByNameAndType(potion.getName(), potion.getType())) {
            throw new EntityExistsException(String.format("Potion with name %s and type %s already exists.", potion.getName(), potion.getType()));
        }
    }

    /// Get all the ingredients for a potion via the potion's id.
    public List<PotionIngredientDTO> getAllPotionIngredientsById(Integer id) {
        Potion potion = potionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Potion with id %d not found.", id)));

        List<PotionIngredient> potionIngredients = potionIngredientRepository.findByPotionId(potion.getId());
        List<PotionIngredientDTO> potionIngredientDTOS = new ArrayList<>();
        for (int i = 0; i < potionIngredients.size(); i++) {
            potionIngredientDTOS.add(potionIngredientMapper.toDTO(potionIngredients.get(i)));
        }

        return potionIngredientDTOS;
    }
}
