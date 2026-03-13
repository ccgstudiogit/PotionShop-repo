package com.connor.potionshop.model.ingredient;

import java.util.*;
import com.connor.potionshop.model.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Ingredient extends BaseEntity {
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Ingredient other = (Ingredient)o;
        return Objects.equals(getId(), other.getId()) &&
                Objects.equals(name, other.name) &&
                Objects.equals(rarity, other.rarity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), name, rarity);
    }
}
