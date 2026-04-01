package com.connor.potionshop.controller;

import java.util.*;

import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.service.PotionService;
import org.springframework.http.*;
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
    public PotionWithIngredientsDTO getPotionById(@PathVariable Integer id) {
        return potionService.getPotionById(id);
    }

    @PostMapping
    public ResponseEntity<PotionDTO> addPotion(@RequestBody CreatePotionDTO createPotionDTO) {
        PotionDTO created = potionService.addPotion(createPotionDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public void deletePotionById(@PathVariable Integer id) {
        potionService.deletePotionById(id);
    }

    @PutMapping("{id}")
    public PotionDTO updatePotionById(@PathVariable Integer id, @RequestBody UpdatePotionDTO updatePotionDTO) {
        return potionService.updatePotionById(id, updatePotionDTO);
    }

    @GetMapping("{id}/ingredients")
    public List<PotionIngredientDTO> getAllPotionIngredientsById(@PathVariable Integer id) {
        return potionService.getAllPotionIngredientsById(id);
    }

    @PostMapping("{id}/ingredients")
    public ResponseEntity<PotionWithIngredientsDTO> addIngredientToPotionById(@PathVariable Integer id, @RequestBody CreatePotionIngredientDTO createPotionIngredientDTO) {
        PotionWithIngredientsDTO updated = potionService.addIngredientToPotionById(id, createPotionIngredientDTO);
        return new ResponseEntity<>(updated, HttpStatus.CREATED);
    }

    @DeleteMapping("{potionId}/ingredients/{ingredientId}")
    public PotionWithIngredientsDTO removeIngredientFromPotionById(@PathVariable Integer potionId, @PathVariable Integer ingredientId) {
        return potionService.removeIngredientFromPotionById(potionId, ingredientId);
    }

    @PatchMapping("{potionId}/ingredients/{ingredientId}")
    public PotionWithIngredientsDTO updatePotionIngredientById(@PathVariable Integer potionId, @PathVariable Integer ingredientId, @RequestBody UpdatePotionIngredientDTO updatePotionIngredientDTO) {
        return potionService.updatePotionIngredientById(potionId, ingredientId, updatePotionIngredientDTO);
    }

    @GetMapping("types")
    public List<String> getPotionTypes() {
        return potionService.getPotionTypes();
    }
}
