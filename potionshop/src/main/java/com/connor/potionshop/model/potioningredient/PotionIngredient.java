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

    /**
     * Returns this join entity's composite primary key (potionId, ingredientId).
     *
     * @return the composite key identifying this PotionIngredient.
     */
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

    /**
     * Determines equality based on the composite primary key.
     *
     * <p>Two PotionIngredient instances are considered equal if they share the same {@link PotionIngredientPk}.</p>
     *
     * @param o the object to compare with.
     * @return true if both objects have the same composite key, false otherwise.
     */
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
