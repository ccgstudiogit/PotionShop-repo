package com.connor.potionshop.controller;

import java.util.*;
import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.service.IngredientService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("ingredients")
public class IngredientController {
    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping
    public List<IngredientDTO> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    @GetMapping("{id}")
    public IngredientDTO getIngredientById(@PathVariable Integer id) {
        return ingredientService.getIngredientById(id);
    }

    @PostMapping
    public ResponseEntity<IngredientDTO> addIngredient(@RequestBody CreateIngredientDTO createIngredientDTO) {
        IngredientDTO created = ingredientService.addIngredient(createIngredientDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
