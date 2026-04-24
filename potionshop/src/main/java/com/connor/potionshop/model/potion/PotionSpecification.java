package com.connor.potionshop.model.potion;

import java.util.*;
import org.springframework.data.jpa.domain.*;

public class PotionSpecification {
    /**
     * Creates a Specification that filters potions by a partial name match. Performs a case-insensitive LIKE query
     * using the provided substring.
     *
     * @param name The substring to search for within potion names.
     * @return A Specification filtering potions whose name contains the substring.
     */
    public static Specification<Potion> hasName(String name) {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    /**
     * Creates a Specification that filters potions whose type is contained within the provided list of PotionType
     * values. Multiple types behave as an OR filter.
     *
     * If the list is null or empty, the Specification resolves to a conjunction (always true), effectively skipping
     * the type filter.
     *
     * @param types A list of PotionType values to include in the filter.
     * @return A Specification matching potions whose type is in the provided list.
     */
    public static Specification<Potion> inType(List<PotionType> types) {
        return (root, query, criteriaBuilder) -> {
            if (types == null || types.isEmpty()) {
                return criteriaBuilder.conjunction(); // Returns true if the list is empty
            }

            return root.get("type").in(types);
        };
    }

    public static Specification<Potion> hasPriceLessThan(Integer price) {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.lessThan(root.get("price"), price);
    }

    public static Specification<Potion> hasPriceLessThanOrEqualTo(Integer price) {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.lessThanOrEqualTo(root.get("price"), price);
    }

    public static Specification<Potion> hasPriceGreaterThan(Integer price) {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.greaterThan(root.get("price"), price);
    }

    public static Specification<Potion> hasPriceGreaterThanOrEqualTo(Integer price) {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.greaterThanOrEqualTo(root.get("price"), price);
    }
}
