package com.connor.potionshop.service;

import java.util.*;

import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.mapper.*;
import com.connor.potionshop.repository.PotionRepository;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;

// Service makes this class available as a service to be used within other classes. Services handle the business logic
@Service
public class PotionService {
    private final PotionRepository potionRepository;
    private final PotionMapper potionMapper;

    public PotionService(PotionRepository potionRepository, PotionMapper potionMapper) {
        this.potionRepository = potionRepository;
        this.potionMapper = potionMapper;
    }

    /// Get a list of potions currently stored in the database.
    public List<PotionDTO> getAllPotions() {
        // Mapper can be used to hide sensitive data from frontend
        return potionRepository.findAll().stream().map(potionMapper::mapToDTO).toList();
    }

    /// Get a potion by its id.
    public PotionDTO getPotionById(Integer id) {
        Potion potion = potionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id + " not found"));
        return potionMapper.mapToDTO(potion);
    }

    /// Add a potion to the database and save it. A PotionDTO is returned if the potion was successfully added.
    public PotionDTO addPotion(CreatePotionDTO createPotionDTO) {
        Potion newPotion = potionMapper.fromCreateDTO(createPotionDTO);
        checkAndThrowIfPotionExists(newPotion);

        potionRepository.save(newPotion);
        return potionMapper.mapToDTO(newPotion);
    }

    /// Remove a potion from the database.
    public void deletePotionById(Integer id) {
        Potion potion = potionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Potion with id %d not found", id)));
        potionRepository.deleteById(id);
    }

    /// Update a potion based on the potion's id. The current potion tied to this id will have its data replaced by the updated
    /// potion DTO.
    public PotionDTO updatePotionById(Integer id, UpdatePotionDTO updatedPotion) {
        Potion potion = potionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Potion with id %d not found. Unable to update", id)));

        potion.setName(updatedPotion.name());
        potion.setType(updatedPotion.type());
        potion.setEffect(updatedPotion.effect());
        potion.setPrice(updatedPotion.price());
        checkAndThrowIfPotionExists(potion); // Verify the potion's updated values are not already in the database

        potionRepository.save(potion);
        return potionMapper.mapToDTO(potion);
    }

    /// Check if a potion of the same name and type already exists in the database. If so, throw an EntityExistsException.
    public void checkAndThrowIfPotionExists(Potion potion) {
        if (potionRepository.existsByNameAndType(potion.getName(), potion.getType())) {
            throw new EntityExistsException(String.format("Potion with name %s and type %s already exists", potion.getName(), potion.getType()));
        }
    }
}
