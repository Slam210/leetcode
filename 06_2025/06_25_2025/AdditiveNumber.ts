/**
 *
 * Given a string, determine if the string is an additive number.
 * An additive number is where the sequence of numbers add into each other,
 * and must be at least 3 digits, except for the first 2 numbers.
 * We can use backtracing to solve our problem. The problem is about splitting
 * the string into a sequence of numbers that it starts with at least 3 numbers.
 * Every number is the sum of the previous two. Each number has no leading zeros
 * (unless it's 0). So in backtracking, at each position, we try taking a
 * substring and interpret it as a number. Recurse to check if it leads to a
 * valid additive sequence.
 *
 *
 */

function isAdditiveNumber(num: string): boolean {
  const n = num.length;

  function backtrack(start: number, sequence: bigint[]): boolean {
    if (start === n && sequence.length >= 3) return true;

    for (let end = start + 1; end <= n; end++) {
      const part = num.substring(start, end);

      if (part.length > 1 && part[0] === "0") break;
      const curr = BigInt(part);

      const len = sequence.length;

      if (len >= 2) {
        const sum = sequence[len - 1] + sequence[len - 2];
        if (curr < sum) continue;
        if (curr > sum) break;
      }

      if (backtrack(end, [...sequence, curr])) return true;
    }
    return false;
  }

  return backtrack(0, []);
}

/**
 *
 * Time complexity is O(2^n)
 * Space complexity is O(n)
 *
 */
