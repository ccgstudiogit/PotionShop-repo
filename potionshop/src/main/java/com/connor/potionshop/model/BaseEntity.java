package com.connor.potionshop.model;

import jakarta.persistence.*;

@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Makes sure the id is generated automatically when using an SQL insert
    private Integer id;

    public Integer getId() {
        return id;
    }
}
