package com.connor.potionshop.model.potion;

import com.connor.potionshop.model.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Potion extends BaseEntity {

    @NotBlank
    @Column(nullable = false) // Enforces constraints in the database as well
    private String name;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private PotionType type;

    private String effect;

    @NotNull
    @Column(nullable = false)
    private Integer price;

    // Empty constructor is required for JPA
    protected Potion() { }

    public Potion(String name, PotionType type, String effect) {
        this.name = name;
        this.type = type;
        this.effect = effect;
        price = 0;
    }

    public Potion(String name, PotionType type, String effect, Integer price) {
        this.name = name;
        this.type = type;
        this.effect = effect;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PotionType getType() {
        return type;
    }

    public void setType(PotionType type) {
        this.type = type;
    }

    public String getEffect() {
        return effect;
    }

    public void setEffect(String effect) {
        this.effect = effect;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    /// Map this potion to a Data Transfer Object.
    public PotionDTO mapToDTO() {
        return new PotionDTO(getId(), name, type, effect, price);
    }
}
