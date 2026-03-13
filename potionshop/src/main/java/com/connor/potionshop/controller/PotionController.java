package com.connor.potionshop.controller;

import java.util.*;

import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.service.PotionService;
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

    // @PathVariable extracts values directly from the URL path
    @GetMapping("{id}")
    public PotionDTO getPotionById(@PathVariable Integer id) {
        return potionService.getPotionById(id);
    }

    public ResponseEntity<PotionDTO> setPotion(Potion potion) {
        return null;
    }
}
