package com.connor.potionshop.model.ingredient;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Ingredient {

    @NotBlank
    @Column(nullable = false, unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private Rarity rarity;

    // Empty constructor is required for JPA
    protected Ingredient() { }

    public Ingredient(String name, Rarity rarity) {
        this.name = name;
        this.rarity = rarity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Rarity getRarity() {
        return rarity;
    }

    public void setRarity(Rarity rarity) {
        this.rarity = rarity;
    }
}
