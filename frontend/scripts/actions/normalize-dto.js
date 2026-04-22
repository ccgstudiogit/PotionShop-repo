/**
 * Normalizes an ingredient DTO received from the backend into a unified frontend-friendly shape. Supports both
 * IngredientDTO (id, name, rarity) nd PotionIngredientDTO (ingredientId, name, rarity, quantity).
 *
 * Ensures that:
 * - `id` is always present (mapped from either `id` or `ingredientId`)
 * - `quantity` is included only when provided by the backend
 *
 * @param {Object} dto - The raw ingredient DTO from the backend.
 * @returns {{
 *   id: number,
 *   name: string,
 *   rarity: string,
 *   quantity?: number
 * }} A normalized ingredient object with consistent field names.
 */
export function normalizeIngredient(dto) {
  const normalized = {
    id: dto.id ?? dto.ingredientId,
    name: dto.name,
    rarity: dto.rarity,
  };

  if (dto.quantity !== undefined && dto.quantity !== null) {
    normalized.quantity = dto.quantity;
  }

  return normalized;
}