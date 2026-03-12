package com.connor.potionshop.service;

import java.util.*;
import com.connor.potionshop.repository.PotionRepository;
import com.connor.potionshop.model.*;
import org.springframework.stereotype.Service;

// Service makes this class available as a service to be used within other classes. Services handle the business logic
@Service
public class PotionService {

    private final PotionRepository potionRepository;

    public PotionService(PotionRepository potionRepository) {
        this.potionRepository = potionRepository;
    }

    /// Get a list of potions currently stored in the database.
    public List<PotionDTO> getAllPotions() {
        // Mapper can be used to hide sensitive data from frontend
        return potionRepository.findAll().stream().map(potion -> new PotionDTO(
            potion.getId(),
            potion.getName(),
            potion.getType(),
            potion.getEffect(),
            potion.getPrice()
        )).toList();
    }
}
