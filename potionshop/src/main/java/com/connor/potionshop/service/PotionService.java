package com.connor.potionshop.service;

import java.util.*;

import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.mapper.*;
import com.connor.potionshop.repository.PotionRepository;
import jakarta.persistence.EntityNotFoundException;
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
        Potion potion = potionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id + " not found"));
        return potionMapper.mapToDTO(potion);
    }

    /// Add a potion to the database and save it. A PotionDTO is returned if the potion was successfully added.
    public PotionDTO addPotion(CreatePotionDTO createPotionDTO) {
        Potion newPotion = potionMapper.fromCreateDTO(createPotionDTO);
        potionRepository.save(newPotion);
        return potionMapper.mapToDTO(newPotion);
    }
}
