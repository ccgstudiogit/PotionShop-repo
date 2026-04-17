export function normalizeIngredient(dto) {
  return {
    id: dto.id ?? dto.ingredientId,
    name: dto.name,
    rarity: dto.rarity,
    quantity: dto.quantity ?? null // find out if theres a way to make quantity completely optional and not even null, just not there
  };
}