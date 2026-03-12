package com.connor.potionshop.controller;

import com.connor.potionshop.model.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("potions")
public class PotionController {
    public PotionController() { }

    @GetMapping
    public Potion getPotion() {
        return new Potion("Potion", PotionType.Healing, "Heal the user", 10);
    }
}
