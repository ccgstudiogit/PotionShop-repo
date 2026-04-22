/**
 * Returns a random integer between the given inclusive bounds.
 *
 * The range is fully inclusive, meaning both `min` and `max` can be returned. Values are normalized to integers
 * before calculation to avoid unexpected behavior if non-integer values are passed.
 *
 * @param {number} min - The lowest integer that can be returned.
 * @param {number} max - The highest integer that can be returned.
 * @returns {number} A random integer between `min` and `max` (inclusive).
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}