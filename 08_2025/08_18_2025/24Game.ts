/**
 *
 * We must determine if four cards (values 1–9) can be combined using +, -, *, /, and parentheses to
 * evaluate to 24. Each operation is binary, there’s no unary minus, and no number concatenation. We
 * should explore all number pairings and operation orders and allow floating-point tolerance. Because
 * there are only four numbers, we can use recursive backtracking: pick any pair of numbers, replace
 * them with the result of applying one operator, and recurse on the smaller multiset. Try all operators.
 * For - and / we must try both orders, and we should guard against division by zero. If we ever reduce to
 * one number that’s within an epsilon of 24, we succeed.
 *
 */

function judgePoint24(cards: number[]): boolean {
  // Small tolerance for floating-point comparisons
  const EPSILON = 1e-6;

  function closeTo24(x: number): boolean {
    return Math.abs(x - 24) < EPSILON;
  }

  // reduce nums until only one number remains
  function solve(nums: number[]): boolean {
    // if only one number remains, check if it's 24
    if (nums.length === 1) return closeTo24(nums[0]);

    // Choose every unordered pair of numbers (i, j)
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        // Build the new list excluding the chosen pair
        const rest: number[] = [];
        for (let k = 0; k < nums.length; k++) {
          if (k !== i && k !== j) rest.push(nums[k]);
        }

        // Take the chosen pair of numbers
        const a = nums[i],
          b = nums[j];

        // Try all possible operations:
        const candidates: number[] = [a + b, a * b, a - b, b - a];

        // Only attempt division if the denominator is not close to zero
        if (Math.abs(b) > EPSILON) candidates.push(a / b);
        if (Math.abs(a) > EPSILON) candidates.push(b / a);

        // For each possible result, recurse with the reduced list
        for (const v of candidates) {
          if (solve([...rest, v])) return true;
        }
      }
    }
    return false;
  }

  return solve(cards);
}

function main() {
  console.log(judgePoint24([4, 1, 8, 7]));
  console.log(judgePoint24([1, 2, 1, 2]));
}

main();

/**
 *
 * Time complexity is O(1) since we are set at 4 cards
 * Space complexity is O(1)
 *
 */
