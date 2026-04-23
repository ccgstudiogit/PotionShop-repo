package com.connor.potionshop.controller;

import java.util.*;

import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.service.PotionService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/potions")
public class PotionController {
    private final PotionService potionService;

    public PotionController(PotionService potionService) {
        this.potionService = potionService;
    }

    @GetMapping
    public List<PotionDTO> getAllPotions() {
        return potionService.getAllPotions();
    }

    @GetMapping("/ingredients")
    public List<PotionWithIngredientsDTO> getAllPotionsWithIngredients() {
        return potionService.getAllPotionsWithIngredients();
    }

    // @PathVariable extracts values directly from the URL path
    @GetMapping("/{id}")
    public PotionWithIngredientsDTO getPotionById(@PathVariable Integer id) {
        return potionService.getPotionById(id);
    }

    @GetMapping("/{id}/ingredients")
    public List<PotionIngredientDTO> getAllPotionIngredientsById(@PathVariable Integer id) {
        return potionService.getAllPotionIngredientsById(id);
    }

    @GetMapping("/search")
    public List<PotionWithIngredientsDTO> getPotionsFiltered(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) List<PotionType> type
    ) {
        return potionService.findAllFiltered(name, type);
    }

    @GetMapping("/types")
    public List<String> getPotionTypes() {
        return potionService.getPotionTypes();
    }

    @PostMapping
    public ResponseEntity<PotionDTO> addPotion(@RequestBody CreatePotionDTO createPotionDTO) {
        PotionDTO created = potionService.addPotion(createPotionDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/ingredients")
    public ResponseEntity<PotionWithIngredientsDTO> addPotionWithIngredients(@RequestBody CreatePotionWithIngDTO createPotionWithIngDTO) {
        PotionWithIngredientsDTO created = potionService.addPotionWithIngredients(createPotionWithIngDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/{id}/ingredients")
    public ResponseEntity<PotionWithIngredientsDTO> addIngredientToPotionById(@PathVariable Integer id, @RequestBody CreatePotionIngredientDTO createPotionIngredientDTO) {
        PotionWithIngredientsDTO updated = potionService.addIngredientToPotionById(id, createPotionIngredientDTO);
        return new ResponseEntity<>(updated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public PotionDTO updatePotionById(@PathVariable Integer id, @RequestBody UpdatePotionDTO updatePotionDTO) {
        return potionService.updatePotionById(id, updatePotionDTO);
    }

    @PutMapping("/{id}/ingredients")
    public PotionWithIngredientsDTO updatePotionWithIngredientsById(@PathVariable Integer id, @RequestBody UpdatePotionWithIngDTO updatePotionWithIngDTO) {
        return potionService.updatePotionWithIngredientsById(id, updatePotionWithIngDTO);
    }

    @PatchMapping("/{potionId}/ingredients/{ingredientId}")
    public PotionWithIngredientsDTO updatePotionIngredientById(@PathVariable Integer potionId, @PathVariable Integer ingredientId, @RequestBody UpdatePotionIngredientDTO updatePotionIngredientDTO) {
        return potionService.updatePotionIngredientById(potionId, ingredientId, updatePotionIngredientDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePotionById(@PathVariable Integer id) {
        potionService.deletePotionById(id);
    }

    @DeleteMapping("/{potionId}/ingredients/{ingredientId}")
    public PotionWithIngredientsDTO removeIngredientFromPotionById(@PathVariable Integer potionId, @PathVariable Integer ingredientId) {
        return potionService.removeIngredientFromPotionById(potionId, ingredientId);
    }
}
