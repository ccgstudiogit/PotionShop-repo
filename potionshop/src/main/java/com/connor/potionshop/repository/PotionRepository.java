package com.connor.potionshop.repository;

import com.connor.potionshop.model.potion.*;
import org.springframework.data.jpa.repository.JpaRepository;

// The interface can be empty because JpaRepository already provides everything and Spring automatically creates the
// implementation at runtime. Specific methods can be added at anytime
public interface PotionRepository extends JpaRepository<Potion, Integer> {
    // Spring automatically parses repository interfaces and generates the query based on certain naming patterns, so no
    // actual implementation is needed
    boolean existsByNameAndType(String name, PotionType type);
}
