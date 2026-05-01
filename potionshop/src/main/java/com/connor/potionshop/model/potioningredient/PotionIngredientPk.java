package com.connor.potionshop.model.potioningredient;

import java.util.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

@Embeddable
public class PotionIngredientPk implements Serializable {
    private Integer potionId;
    private Integer ingredientId;

    // JPA requires a no-args constructor
    public PotionIngredientPk() { }

    public PotionIngredientPk(Integer potionId, Integer ingredientId) {
        this.potionId = potionId;
        this.ingredientId = ingredientId;
    }

    public Integer getPotionId() {
        return potionId;
    }

    public Integer getIngredientId() {
        return ingredientId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PotionIngredientPk other = (PotionIngredientPk)o;
        return Objects.equals(potionId, other.potionId) && Objects.equals(ingredientId, other.ingredientId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(potionId, ingredientId);
    }
}
