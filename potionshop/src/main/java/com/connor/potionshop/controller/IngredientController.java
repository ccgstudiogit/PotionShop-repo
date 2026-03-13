package com.connor.potionshop.controller;

import java.util.*;
import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.service.IngredientService;
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
}
