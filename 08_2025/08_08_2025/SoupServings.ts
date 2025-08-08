/**
 *
 * We have two soups, A and B, each starting with the same amount, and in each turn we randomly choose
 * one of four fixed pour patterns that reduce them in multiples of 25 mL. The goal is to find the
 * probability that A empties first plus half the probability that both empty at the same time. The key
 * insight is that because pours are always in 25 mL increments, we can scale the problem down to “units”
 * of 25 mL and use recursion with memoization to explore all possible states (a,b) of remaining units.
 * Base cases handle when one or both soups are empty, and the recursive relation averages the results of
 * the four possible pour outcomes. For very large n, the probability converges to 1 within the allowed error,
 * so we can return 1.0 directly to avoid heavy computation.
 *
 */

function soupServings(n: number): number {
  if (n === 0) return 0.5;
  if (n >= 4800) return 1.0;

  const units = Math.ceil(n / 25);
  const memo = new Map<string, number>();

  function dfs(a: number, b: number): number {
    if (a <= 0 && b <= 0) return 0.5;
    if (a <= 0) return 1.0;
    if (b <= 0) return 0.0;
    const key = `${a},${b}`;
    if (memo.has(key)) return memo.get(key)!;

    const res =
      0.25 *
      (dfs(a - 4, b) +
        dfs(a - 3, b - 1) +
        dfs(a - 2, b - 2) +
        dfs(a - 1, b - 3));

    memo.set(key, res);
    return res;
  }

  return dfs(units, units);
}

function main(): void {
  const samples = [50, 100, 0, 4800];
  for (const n of samples) {
    const prob = soupServings(n);
    console.log(`n = ${n} -> probability = ${prob.toFixed(5)}`);
  }
}

main();

/**
 *
 * Time complexity is O(n^2)
 * Space complexity is O(n^2)
 *
 */
