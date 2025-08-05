/**
 *
 * Given coins[] which is an array of coin denominations and amount, a target amount, the goal is to
 * return the number of distinct combinations (order doesn't matter) of coins that sum up to amount.
 * ach coin can be used infinite times. This is a classic Dynamic Programming (DP) problem. We want to
 * find the number of combinations to reach a certain amount. It’s like a variation of the Unbounded
 * Knapsack problem.
 *
 */

function change(amount: number, coins: number[]): number {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount];
}

function main() {
  const tests = [
    { coins: [1, 2, 5], amount: 5, expected: 4 },
    { coins: [2], amount: 3, expected: 0 },
    { coins: [10], amount: 10, expected: 1 },
  ];

  for (const { coins, amount, expected } of tests) {
    const result = change(amount, coins);
    console.log(
      `coins = ${coins}, amount = ${amount} → Output: ${result}, Expected: ${expected}`
    );
  }
}

main();

/**
 *
 * Time Complexity is O(amount * n)
 * Space complexity is O(amount)
 *
 */
