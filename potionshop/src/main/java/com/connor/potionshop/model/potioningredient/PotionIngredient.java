package com.connor.potionshop.model.potioningredient;

import java.util.*;
import com.connor.potionshop.model.BaseEntity;
import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.ingredient.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

/// Represents the join entity for the many‑to‑many relationship between Potion and Ingredient. Unlike Potion and Ingredient,
/// this entity is not exposed directly through the API. It exists purely for backend/domain logic and stores
/// relationship‑specific data (e.g., quantity). Its identity is defined by the composite key (potionId, ingredientId).
@Entity
public class PotionIngredient {
    @EmbeddedId
    private PotionIngredientPk id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("potionId") // MapsId annotation implies FK cannot be null
    private Potion potion;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredientId")
    private Ingredient ingredient;

    @Min(1)
    @NotNull
    @Column(nullable = false)
    private Integer quantity;

    public PotionIngredient() { }

    public PotionIngredient(Potion potion, Ingredient ingredient, Integer quantity) {
        this.potion = potion;
        this.ingredient = ingredient;
        this.quantity = quantity;
        id = new PotionIngredientPk(potion.getId(), ingredient.getId());
    }

    /// Get this PotionIngredient's id, which is the composite key: (potionId, ingredientId).
    public PotionIngredientPk getId() {
        return id;
    }

    public Potion getPotion() {
        return potion;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /// PotionIngredients are considered equal if they share the same composite primary key.
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PotionIngredient other = (PotionIngredient)o;
        return id.equals(other.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
