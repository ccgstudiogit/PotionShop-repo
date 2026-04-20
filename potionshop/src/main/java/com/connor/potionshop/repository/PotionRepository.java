package com.connor.potionshop.repository;

import java.util.*;
import com.connor.potionshop.model.potion.*;
import org.springframework.data.jpa.repository.*;

// The interface can be empty because JpaRepository already provides everything and Spring automatically creates the
// implementation at runtime. Specific methods can be added at anytime
public interface PotionRepository extends JpaRepository<Potion, Integer> {
    // Spring automatically parses repository interfaces and generates the query based on certain naming patterns, so no
    // actual implementation is needed
    boolean existsByNameAndType(String name, PotionType type);

    @Query("SELECT p FROM Potion p WHERE LOWER(p.name) LIKE %:name%")
    List<Potion> findByNameLike(String name);

    @Query("SELECT p FROM Potion p WHERE p.type = :type")
    List<Potion> findByType(PotionType type);

    @Query("SELECT p FROM Potion p WHERE p.price = :price")
    List<Potion> findByPriceEqualTo(Integer price);
}
