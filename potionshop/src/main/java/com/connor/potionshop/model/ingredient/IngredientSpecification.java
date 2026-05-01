package com.connor.potionshop.model.ingredient;

import java.util.*;
import com.connor.potionshop.model.ingredient.*;
import org.springframework.data.jpa.domain.Specification;

public class IngredientSpecification {
    /**
     * Creates a Specification that filters ingredients by a partial name match. Performs a case-insensitive LIKE query
     * using the provided substring.
     *
     * @param name The substring to search for within ingredient names.
     * @return A Specification filtering ingredients whose name contains the substring.
     */
    public static Specification<Ingredient> hasName(String name) {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    /**
     * Creates a Specification that filters ingredients whose rarity is contained within the provided list of Rarity
     * values. Multiple rarities behave as an OR filter.
     *
     * If the list is null or empty, the Specification resolves to a conjunction (always true), effectively skipping
     * the rarity filter.
     *
     * @param rarity A list of Rarity values to include in the filter.
     * @return A Specification matching ingredients whose rarity is in the provided list.
     */
    public static Specification<Ingredient> inRarity(List<Rarity> rarity) {
        return (root, query, criteriaBuilder) -> {
            if (rarity == null || rarity.isEmpty()) {
                return criteriaBuilder.conjunction(); // Returns true if the list is empty
            }

            return root.get("rarity").in(rarity);
        };
    }
}
