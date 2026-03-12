package com.connor.potionshop.controller;

import java.util.*;
import com.connor.potionshop.model.*;
import com.connor.potionshop.service.PotionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("potions")
public class PotionController {

    private final PotionService potionService;

    public PotionController(PotionService potionService) {
        this.potionService = potionService;
    }

    @GetMapping
    public Potion getPotion() {
        return new Potion("Potion", PotionType.Healing, "Heal the user", 10);
    }

    @GetMapping
    public List<PotionDTO> getAllPotions() {
        return potionService.getAllPotions();
    }
}
