/**
 *
 * This problem is a derivative of the Best Time to Buy and Sell Stock problem.
 * The additonal constraint on this problem is that we now have to wait at least 1
 * day before we can buy again. Even with this added constraint, we can still approach
 * this problem using dynnamic probgramming.
 *
 */

function maxProfit(prices: number[]): number {
  const n = prices.length;
  if (n === 0) return 0;

  const hold: number[] = new Array(n).fill(0);
  const sold: number[] = new Array(n).fill(0);
  const rest: number[] = new Array(n).fill(0);

  hold[0] = -prices[0];
  sold[0] = 0;
  rest[0] = 0;

  for (let i = 1; i < n; i++) {
    hold[i] = Math.max(hold[i - 1], rest[i - 1] - prices[i]);
    sold[i] = hold[i - 1] + prices[i];
    rest[i] = Math.max(rest[i - 1], sold[i - 1]);
  }

  return Math.max(sold[n - 1], rest[n - 1]);
}

const prices = [1, 2, 3, 0, 2];
console.log(maxProfit(prices));

/**
 *
 * Run time is O(n)
 * Space complexity is O(n)
 *
 */
