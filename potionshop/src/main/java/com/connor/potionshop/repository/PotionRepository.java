package com.connor.potionshop.repository;

import com.connor.potionshop.model.Potion;
import org.springframework.data.jpa.repository.JpaRepository;

// The interface is empty because JpaRepository already provides everything and Spring automatically creates the
// implementation at runtime. Specific methods can be added at anytime
public interface PotionRepository extends JpaRepository<Potion, Integer> { }
