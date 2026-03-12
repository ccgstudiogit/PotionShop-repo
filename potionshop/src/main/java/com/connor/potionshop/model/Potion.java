package com.connor.potionshop.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Potion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Makes sure the id is generated automatically when using an SQL insert
    private Integer id;

    @NotBlank
    private String name;

    @Enumerated(EnumType.STRING)
    private PotionType type;

    private String effect;

    @NotNull
    private Integer price;
}
