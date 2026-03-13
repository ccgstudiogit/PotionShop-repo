package com.connor.potionshop.controller;

import java.util.*;
import com.connor.potionshop.model.*;
import com.connor.potionshop.service.PotionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("potions")
public class PotionController {

    private final PotionService potionService;

    public PotionController(PotionService potionService) {
        this.potionService = potionService;
    }

    @GetMapping
    public List<PotionDTO> getAllPotions() {
        return potionService.getAllPotions();
    }

    @GetMapping("{id}")
    public ResponseEntity<PotionDTO> getPotionById(@PathVariable Integer id) {
        try {
            PotionDTO potion = potionService.getPotionById(id);
            return new ResponseEntity<>(potion, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
