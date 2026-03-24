import * as potionApi from '../api/potion-api.js';

export async function getAllPotions() {
  const potions = await potionApi.fetchAllPotions();
  console.log(potions);
}