package com.connor.potionshop.seeder;

import java.util.*;
import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.ingredient.*;
import com.connor.potionshop.model.potioningredient.*;

public class SeedData {
    public List<Potion> getPotionSeedData() {
        return new ArrayList<Potion>(List.of(
            new Potion(
                "Healing Draught",
                PotionType.Healing,
                "Restores minor wounds over time.",
                25
            ),
            new Potion(
                "Greater Healing Elixir",
                PotionType.Healing,
                "Rapidly mends deep injuries.",
                60
            ),
            new Potion(
                "Stonehide Tonic",
                PotionType.Buff,
                "Hardens the skin like stone.",
                45
            ),
            new Potion(
                "Swiftstep Brew",
                PotionType.Buff,
                "Increases movement speed temporarily.",
                30
            ),
            new Potion(
                "Mindfocus Elixir",
                PotionType.Buff,
                "Sharpened concentration and clarity.",
                40
            ),
            new Potion(
                "Shadowstep Philter",
                PotionType.Stealth,
                "Grants brief invisibility.",
                80
            ),
            new Potion(
                "Silent Veil Extract",
                PotionType.Stealth,
                "Muffles all sound from the drinker.",
                55
            ),
            new Potion(
                "Nightcloak Serum",
                PotionType.Stealth,
                "Blends the user into darkness.",
                70
            ),
            new Potion(
                "Flameburst Vial",
                PotionType.Damage,
                "Releases a burst of fire on impact.",
                35
            ),
            new Potion(
                "Frostbite Concoction",
                PotionType.Damage,
                "Deals chilling cold damage.",
                40
            ),
            new Potion(
                "Thundercrack Potion",
                PotionType.Damage,
                "Unleashes a shockwave of lightning.",
                65
            ),
            new Potion(
                "Sunflare Brew",
                PotionType.Utility,
                "Emits bright light for several minutes.",
                20
            ),
            new Potion(
                "Featherfall Tonic",
                PotionType.Utility,
                "Prevents fall damage temporarily.",
                25
            ),
            new Potion(
                "Aquamorph Essence",
                PotionType.Utility,
                "Allows brief underwater breathing.",
                50
            ),
            new Potion(
                "Toxic Fang Serum",
                PotionType.Poison,
                "Weakens the target with venom.",
                45
            ),
            new Potion(
                "Nightshade Distillate",
                PotionType.Poison,
                "A potent, slow‑acting poison.",
                70
            ),
            new Potion(
                "Corrosion Brew",
                PotionType.Poison,
                "Dissolves organic material on contact.",
                55
            ),
            new Potion(
                "Mana Bloom Extract",
                PotionType.Healing,
                "Restores magical energy.",
                50
            ),
            new Potion(
                "Ironwill Draught",
                PotionType.Buff,
                "Boosts resistance to mental effects.",
                35
            ),
            new Potion(
                "Galeheart Potion",
                PotionType.Utility,
                "Allows short bursts of wind‑assisted jumps.",
                40
            ),
            new Potion(
                "Emberveil Draught",
                PotionType.Buff,
                "Grants temporary resistance to fire and heat.",
                55
            )
        ));
    }

    public List<Ingredient> getIngredientSeedData() {
        return new ArrayList<Ingredient>(List.of(
            new Ingredient("Moonpetal Leaf", Rarity.Uncommon),
            new Ingredient("Dragonfly Husk", Rarity.Common),
            new Ingredient("Emberroot Shard", Rarity.Rare),
            new Ingredient("Frostvine Sap", Rarity.Uncommon),
            new Ingredient("Nightshade Berry", Rarity.Rare),
            new Ingredient("Crystalized Mana Dust", Rarity.Legendary),
            new Ingredient("Glowcap Mushroom", Rarity.Common),
            new Ingredient("Silverthorn Bark", Rarity.Uncommon),
            new Ingredient("Phoenix Ash", Rarity.Legendary),
            new Ingredient("Whispering Fern", Rarity.Common),
            new Ingredient("Crimson Root", Rarity.Uncommon),
            new Ingredient("Violet Mushroom", Rarity.Common),
            new Ingredient("Dragon's Leaf", Rarity.Rare),
            new Ingredient("Moon-touched Alocasia", Rarity.Legendary),
            new Ingredient("Worm Jelly", Rarity.Uncommon),
            new Ingredient("Spider Egg", Rarity.Common),
            new Ingredient("Mountain Flower", Rarity.Common),
            new Ingredient("Ashen Thistle", Rarity.Common),
            new Ingredient("Brambleberry Seed", Rarity.Common),
            new Ingredient("Dusklily Petal", Rarity.Uncommon),
            new Ingredient("Ironbark Splinter", Rarity.Uncommon),
            new Ingredient("Glimmerdew Droplet", Rarity.Rare),
            new Ingredient("Thornvine Pod", Rarity.Common),
            new Ingredient("Sapphire Moss", Rarity.Uncommon),
            new Ingredient("Hollowcap Fungus", Rarity.Common),
            new Ingredient("Stormroot Fiber", Rarity.Rare),
            new Ingredient("Everspring Herb", Rarity.Common),
            new Ingredient("Shimmerglass Shard", Rarity.Uncommon),
            new Ingredient("Elderwyrm Scale", Rarity.Legendary),
            new Ingredient("Blightmint Leaf", Rarity.Common),
            new Ingredient("Starwhisper Anther", Rarity.Rare),
            new Ingredient("Auric Sporeling", Rarity.Uncommon)
        ));
    }

    public List<PotionIngredient> getPotionIngredientSeedData(ArrayList<Potion> savedPotions, ArrayList<Ingredient> savedIngredients) {
        return new ArrayList<PotionIngredient>(List.of(
            new PotionIngredient(savedPotions.get(0), savedIngredients.get(0), 2),
            new PotionIngredient(savedPotions.get(0), savedIngredients.get(6), 1),
            new PotionIngredient(savedPotions.get(0), savedIngredients.get(9), 3),
            new PotionIngredient(savedPotions.get(1), savedIngredients.get(0), 3),
            new PotionIngredient(savedPotions.get(1), savedIngredients.get(7), 2),
            new PotionIngredient(savedPotions.get(1), savedIngredients.get(21), 1),
            new PotionIngredient(savedPotions.get(1), savedIngredients.get(16), 1),
            new PotionIngredient(savedPotions.get(2), savedIngredients.get(20), 2),
            new PotionIngredient(savedPotions.get(2), savedIngredients.get(16), 3),
            new PotionIngredient(savedPotions.get(2), savedIngredients.get(22), 1),
            new PotionIngredient(savedPotions.get(3), savedIngredients.get(1), 2),
            new PotionIngredient(savedPotions.get(3), savedIngredients.get(9), 1),
            new PotionIngredient(savedPotions.get(3), savedIngredients.get(19), 1),
            new PotionIngredient(savedPotions.get(4), savedIngredients.get(7), 1),
            new PotionIngredient(savedPotions.get(4), savedIngredients.get(23), 2),
            new PotionIngredient(savedPotions.get(4), savedIngredients.get(31), 1),
            new PotionIngredient(savedPotions.get(5), savedIngredients.get(11), 2),
            new PotionIngredient(savedPotions.get(5), savedIngredients.get(13), 1),
            new PotionIngredient(savedPotions.get(5), savedIngredients.get(24), 1),
            new PotionIngredient(savedPotions.get(5), savedIngredients.get(0), 1),
            new PotionIngredient(savedPotions.get(6), savedIngredients.get(15), 2),
            new PotionIngredient(savedPotions.get(6), savedIngredients.get(9), 3),
            new PotionIngredient(savedPotions.get(6), savedIngredients.get(26), 1),
            new PotionIngredient(savedPotions.get(7), savedIngredients.get(19), 2),
            new PotionIngredient(savedPotions.get(7), savedIngredients.get(23), 1),
            new PotionIngredient(savedPotions.get(7), savedIngredients.get(17), 2),
            new PotionIngredient(savedPotions.get(8), savedIngredients.get(10), 2),
            new PotionIngredient(savedPotions.get(8), savedIngredients.get(12), 1),
            new PotionIngredient(savedPotions.get(8), savedIngredients.get(23), 1),
            new PotionIngredient(savedPotions.get(8), savedIngredients.get(29), 2),
            new PotionIngredient(savedPotions.get(9), savedIngredients.get(3), 3),
            new PotionIngredient(savedPotions.get(9), savedIngredients.get(23), 1),
            new PotionIngredient(savedPotions.get(9), savedIngredients.get(2), 1),
            new PotionIngredient(savedPotions.get(11), savedIngredients.get(6), 2),
            new PotionIngredient(savedPotions.get(11), savedIngredients.get(0), 1),
            new PotionIngredient(savedPotions.get(11), savedIngredients.get(27), 1),
            new PotionIngredient(savedPotions.get(11), savedIngredients.get(25), 1),
            new PotionIngredient(savedPotions.get(12), savedIngredients.get(1), 2),
            new PotionIngredient(savedPotions.get(12), savedIngredients.get(26), 1),
            new PotionIngredient(savedPotions.get(12), savedIngredients.get(19), 1),
            new PotionIngredient(savedPotions.get(13), savedIngredients.get(15), 4),
            new PotionIngredient(savedPotions.get(13), savedIngredients.get(18), 4),
            new PotionIngredient(savedPotions.get(13), savedIngredients.get(21), 1),
            new PotionIngredient(savedPotions.get(13), savedIngredients.get(23), 1),
            new PotionIngredient(savedPotions.get(14), savedIngredients.get(14), 2),
            new PotionIngredient(savedPotions.get(14), savedIngredients.get(4), 1),
            new PotionIngredient(savedPotions.get(14), savedIngredients.get(29), 2),
            new PotionIngredient(savedPotions.get(15), savedIngredients.get(2), 1),
            new PotionIngredient(savedPotions.get(15), savedIngredients.get(14), 2),
            new PotionIngredient(savedPotions.get(15), savedIngredients.get(20), 4),
            new PotionIngredient(savedPotions.get(15), savedIngredients.get(28), 1),
            new PotionIngredient(savedPotions.get(16), savedIngredients.get(29), 2),
            new PotionIngredient(savedPotions.get(16), savedIngredients.get(22), 2),
            new PotionIngredient(savedPotions.get(16), savedIngredients.get(2), 1),
            new PotionIngredient(savedPotions.get(16), savedIngredients.get(10), 1),
            new PotionIngredient(savedPotions.get(17), savedIngredients.get(5), 2),
            new PotionIngredient(savedPotions.get(17), savedIngredients.get(21), 1),
            new PotionIngredient(savedPotions.get(17), savedIngredients.get(30), 1),
            new PotionIngredient(savedPotions.get(18), savedIngredients.get(7), 2),
            new PotionIngredient(savedPotions.get(18), savedIngredients.get(16), 2),
            new PotionIngredient(savedPotions.get(18), savedIngredients.get(19), 1),
            new PotionIngredient(savedPotions.get(19), savedIngredients.get(1), 2),
            new PotionIngredient(savedPotions.get(19), savedIngredients.get(25), 1),
            new PotionIngredient(savedPotions.get(19), savedIngredients.get(26), 1),
            new PotionIngredient(savedPotions.get(19), savedIngredients.get(9), 1),
            new PotionIngredient(savedPotions.get(20), savedIngredients.get(2), 1),
            new PotionIngredient(savedPotions.get(20), savedIngredients.get(29), 2),
            new PotionIngredient(savedPotions.get(20), savedIngredients.get(7), 1)
        ));
    }
}
