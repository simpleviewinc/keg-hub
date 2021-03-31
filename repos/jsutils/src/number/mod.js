/** @module number */

/**
 * Returns the result of evaluation `num` modulo `divisor`.
 * Javascript's built-in modulo (%) operator does not process values
 * correctly when they are negative. This works properly with 
 * negatives numbers.
 * @function
 * @param {number} num 
 * @param {number} divisor 
 * @return {number?} the modulo result. Should be equivalent to
 * return values from the `%` operator, except with negative `num` values.
 * @example
 * -1 % 10      // -1
 * mod(-1, 10)  // 9
 */
export const mod = (num, divisor) => {
  return ((num % divisor) + divisor) % divisor 
}