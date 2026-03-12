package com.connor.potionshop.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Makes sure the id is generated automatically when using an SQL insert
    private Integer id;

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

    public Integer getId() {
        return id;
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
