package com.connor.potionshop.service;

import java.util.*;
import java.util.stream.*;

import com.connor.potionshop.model.potion.*;
import com.connor.potionshop.model.potioningredient.*;
import com.connor.potionshop.mapper.*;
import com.connor.potionshop.repository.*;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;

// Service makes this class available as a service to be used within other classes. Services handle the business logic
@Service
public class PotionService {
    private final PotionRepository potionRepository;
    private final PotionMapper potionMapper;
    private final PotionIngredientService potionIngredientService;
    private final PotionIngredientMapper potionIngredientMapper;

    public PotionService(
        PotionRepository potionRepository,
        PotionIngredientService potionIngredientService,
        PotionMapper potionMapper,
        PotionIngredientMapper potionIngredientMapper
    ) {
        this.potionRepository = potionRepository;
        this.potionMapper = potionMapper;
        this.potionIngredientService = potionIngredientService;
        this.potionIngredientMapper = potionIngredientMapper;
    }

    /**
     * Retrieves all potions stored in the database as Data Transfer Objects.
     *
     * @return a list of PotionDTOs representing all potions
     */
    public List<PotionDTO> getAllPotions() {
        // Mapper can be used to hide sensitive data from frontend
        return potionRepository.findAll().stream().map(potionMapper::toDTO).toList();
    }

    /**
     * Retrieves all potions stored in the database with their respective ingredients.
     *
     * @return a list of PotionWithIngredientDTOs
     */
    public List<PotionWithIngredientsDTO> getAllPotionsWithIngredients() {
        List<Potion> potions = potionRepository.findAll().stream().toList();
        List<PotionWithIngredientsDTO> potionsWithIngredients = new ArrayList<>();

        for (int i = 0; i < potions.size(); i++) {
            // Take advantage of getPotionById since that gets a potion with its ingredients
            potionsWithIngredients.add(getPotionById(potions.get(i).getId()));
        }

        return potionsWithIngredients;
    }

    /**
     * Retrieves a potion by its id, including its list of ingredient DTOs.
     *
     * @param id the id of the potion to retrieve
     * @return a PotionWithIngredientsDTO containing potion details and ingredients
     * @throws EntityNotFoundException if no potion exists with the given id
     */
    public PotionWithIngredientsDTO getPotionById(Integer id) {
        Potion potion = potionRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Potion with id %d not found.", id)
            ));

        List<PotionIngredientDTO> ingredients = getAllPotionIngredientsById(potion.getId());
        return potionMapper.toWithIngredientsDTO(potion, ingredients);
    }

    /**
     * Retrieves all potions stored in the database with a name containing the input, with their respective ingredients.
     *
     * @param name The potions whose names are like this (the SQL query uses %LIKE%)
     * @return A list of PotionWithIngredientDTOs whose name contains the input String
     */
    public List<PotionWithIngredientsDTO> getPotionsWithNameLike(String name) {
        List<Potion> potions = potionRepository.findByNameLike(name.toLowerCase()).stream().toList();
        List<PotionWithIngredientsDTO> potionsWithIngredients = new ArrayList<>();

        for (int i = 0; i < potions.size(); i++) {
            potionsWithIngredients.add(getPotionById(potions.get(i).getId()));
        }

        return potionsWithIngredients;
    }

    /**
     * Retrieves all potions stored in the database with the PotionType matching the input, with their respective ingredients.
     *
     * @param type The potions that have the same PotionType
     * @return A list of PotionWithIngredientDTOs whose type matches the input PotionType
     */
    public List<PotionWithIngredientsDTO> getPotionsWithType(PotionType type) {
        List<Potion> potions = potionRepository.findByType(type).stream().toList();
        List<PotionWithIngredientsDTO> potionsWithIngredients = new ArrayList<>();

        for (int i = 0; i < potions.size(); i++) {
            potionsWithIngredients.add(getPotionById(potions.get(i).getId()));
        }

        return potionsWithIngredients;
    }

    /**
     * Creates and saves a new potion based on the provided creation DTO.
     *
     * @param createPotionDTO the data used to create the potion
     * @return the newly created PotionDTO
     * @throws EntityExistsException if a potion with the same name and type already exists
     */
    public PotionDTO addPotion(CreatePotionDTO createPotionDTO) {
        Potion newPotion = potionMapper.fromCreateDTO(createPotionDTO);
        checkAndThrowIfPotionExists(newPotion);

        potionRepository.save(newPotion);
        return potionMapper.toDTO(newPotion);
    }

    /**
     * Creates a new potion along with its associated ingredient relationships.
     *
     * @param createPotionWithIngDTO The DTO containing potion fields and a list of ingredient/quantity pairs
     * @return A {@link PotionWithIngredientsDTO} representing the newly created potion along with its associated ingredient DTOs
     * @throws EntityExistsException If a potion with the same identifying fields already exists
     */
    public PotionWithIngredientsDTO addPotionWithIngredients(CreatePotionWithIngDTO createPotionWithIngDTO) {
        Potion newPotion = potionMapper.fromCreateDTO(createPotionWithIngDTO);
        checkAndThrowIfPotionExists(newPotion);
        potionRepository.save(newPotion);

        // After creating and saving the new potion, create the potion-ingredient tables to save their relationship
        List<PotionIngredientDTO> potionIngredientDTOS = new ArrayList<>(); // For returning a list of ingredients
        List<CreatePotionIngredientDTO> potionIngredients = createPotionWithIngDTO.ingredients().stream().toList();
        for (int i = 0; i < potionIngredients.size(); i++) {
            PotionIngredient potionIngredient = potionIngredientMapper.fromCreateDTO(
                potionIngredients.get(i),
                newPotion,
                potionIngredientService.getIngredientById(potionIngredients.get(i).ingredientId())
            );

            potionIngredientService.addPotionIngredient(potionIngredient);
            potionIngredientDTOS.add(potionIngredientMapper.toDTO(potionIngredient));
        }

        return potionMapper.toWithIngredientsDTO(newPotion, potionIngredientDTOS);
    }

    /**
     * Deletes a potion from the database by its id. Also deletes any associated PotionIngredient.
     *
     * @param id the id of the potion to delete
     * @throws EntityNotFoundException if no potion exists with the given id
     */
    public void deletePotionById(Integer id) {
        Potion potion = potionRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Potion with id %d not found.", id)
            ));

        // Make sure to delete any PotionIngredient relationship related to this potion that's being deleted
        List<PotionIngredient> potionIngredients = potionIngredientService.getPotionIngredientsByPotionId(id);
        for (int i = 0; i < potionIngredients.size(); i++) {
            potionIngredientService.deletePotionIngredient(id, potionIngredients.get(i).getIngredient().getId());
        }

        potionRepository.deleteById(id);
    }

    /**
     * Updates a potion's fields based on its id.
     *
     * <p>After applying updates, this method verifies that the resulting potion does not duplicate an existing
     * name–type combination.</p>
     *
     * @param id the id of the potion to update
     * @param updatedPotion the new potion values
     * @return the updated PotionDTO
     * @throws EntityNotFoundException if no potion exists with the given id
     * @throws EntityExistsException if the updated potion conflicts with an existing one
     */
    public PotionDTO updatePotionById(Integer id, UpdatePotionDTO updatedPotion) {
        Potion potion = potionRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Potion with id %d not found. Unable to update.", id)
            ));

        potion.setName(updatedPotion.name());
        potion.setType(updatedPotion.type());
        potion.setEffect(updatedPotion.effect());
        potion.setPrice(updatedPotion.price());
        checkAndThrowIfPotionExists(potion); // Verify the potion's updated values are not already in the database

        potionRepository.save(potion);
        return potionMapper.toDTO(potion);
    }

    /**
     * Updates a potion's fields based on its id as well as updating its ingredient relationships.
     *
     * <p>After applying updates, this method verifies that the resulting potion does not duplicate an existing
     * name–type combination.</p>
     *
     * @param id the id of the potion to update
     * @param updatedPotionWithIng the new potion values with ingredients
     * @return the updated PotionWithIngredientsDTO
     * @throws EntityNotFoundException if no potion exists with the given id
     * @throws EntityExistsException if the updated potion conflicts with an existing one
     */
    public PotionWithIngredientsDTO updatePotionWithIngredientsById(Integer id, UpdatePotionWithIngDTO updatedPotionWithIng) {
        Potion potion = potionRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Potion with id %d not found. Unable to update.", id)
            ));

        potion.setName(updatedPotionWithIng.name());
        potion.setType(updatedPotionWithIng.type());
        potion.setEffect(updatedPotionWithIng.effect());
        potion.setPrice(updatedPotionWithIng.price());
        checkAndThrowIfPotionExists(potion); // Verify the potion's updated values are not already in the database
        potionRepository.save(potion);

        List<PotionIngredientDTO> potionIngredientDTOS = new ArrayList<>(); // For returning a list of ingredients
        List<PotionIngredient> potionIngredients = potionIngredientService.getPotionIngredientsByPotionId(id);
        for (int i = 0; i < potionIngredients.size(); i++) {
            UpdatePotionIngredientDTO updatedQuantity = potionIngredientMapper.toUpdateDTO(potionIngredients.get(i));
            PotionIngredient updatedPotionIngredient = potionIngredientService.updatePotionIngredient(
                potion.getId(),
                potionIngredients.get(i).getIngredient().getId(),
                updatedQuantity
            );

            potionIngredientDTOS.add(potionIngredientMapper.toDTO(updatedPotionIngredient));
        }

        return potionMapper.toWithIngredientsDTO(potion, potionIngredientDTOS);
    }

    /**
     * Checks whether a potion with the same name and type already exists.
     *
     * @param potion the potion to validate
     * @throws EntityExistsException if a matching potion already exists
     */
    public void checkAndThrowIfPotionExists(Potion potion) {
        if (potionRepository.existsByNameAndType(potion.getName(), potion.getType())) {
            throw new EntityExistsException(
                String.format(
                    "Potion with name %s and type %s already exists.",
                    potion.getName(),
                    potion.getType()
                )
            );
        }
    }

    /**
     * Retrieves all ingredient DTOs associated with a potion by its id.
     *
     * @param id the id of the potion
     * @return a list of PotionIngredientDTOs for the potion
     * @throws EntityNotFoundException if the potion does not exist
     */
    public List<PotionIngredientDTO> getAllPotionIngredientsById(Integer id) {
        Potion potion = potionRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                String.format("Potion with id %d not found.", id)
            ));

        List<PotionIngredient> potionIngredients = potionIngredientService.getPotionIngredientsByPotionId(potion.getId());
        List<PotionIngredientDTO> potionIngredientDTOS = new ArrayList<>();
        for (int i = 0; i < potionIngredients.size(); i++) {
            potionIngredientDTOS.add(potionIngredientMapper.toDTO(potionIngredients.get(i)));
        }

        return potionIngredientDTOS;
    }

    /**
     * Adds an ingredient to a potion using the potion's id.
     *
     * @param potionId the id of the potion
     * @param newIngredient the ingredient data to add
     * @return the updated PotionWithIngredientsDTO
     */
    public PotionWithIngredientsDTO addIngredientToPotionById(Integer potionId, CreatePotionIngredientDTO newIngredient) {
        PotionIngredient newPotionIngredient = new PotionIngredient(
            potionIngredientService.getPotionById(potionId),
            potionIngredientService.getIngredientById(newIngredient.ingredientId()),
            newIngredient.quantity()
        );

        potionIngredientService.addPotionIngredient(newPotionIngredient);
        return getPotionById(potionId);
    }

    /**
     * Removes an ingredient from a potion using the potion and ingredient ids.
     *
     * @param potionId the id of the potion
     * @param ingredientId the id of the ingredient to remove
     * @return the updated PotionWithIngredientsDTO
     */
    public PotionWithIngredientsDTO removeIngredientFromPotionById(Integer potionId, Integer ingredientId) {
        potionIngredientService.deletePotionIngredient(potionId, ingredientId);
        return getPotionById(potionId);
    }

    /**
     * Updates a potion–ingredient relationship, such as modifying quantity.
     *
     * @param potionId the id of the potion
     * @param ingredientId the id of the ingredient
     * @param updatePotionIngredientDTO the updated quantity values
     * @return the updated PotionWithIngredientsDTO
     */
    public PotionWithIngredientsDTO updatePotionIngredientById(Integer potionId, Integer ingredientId, UpdatePotionIngredientDTO updatePotionIngredientDTO) {
        potionIngredientService.updatePotionIngredient(potionId, ingredientId, updatePotionIngredientDTO);
        return getPotionById(potionId);
    }

    /**
     * Get a list of all potion types from the PotionType enum as a list of Strings.
     *
     * @return a list of PotionType values as Strings.
     */
    public List<String> getPotionTypes() {
        return Stream.of(PotionType.values()).map(PotionType::name).toList();
    }
}
