export const addIngredientEvent = 'add-ingredient';

export function addIngredient(ingredientObject, quantity) {
  return new CustomEvent(addIngredientEvent, {
    detail: {
      id: ingredientObject.id,
      quantity: quantity
    }
  });
}
