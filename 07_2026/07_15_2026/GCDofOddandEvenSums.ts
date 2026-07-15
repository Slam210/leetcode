/**
 * @lc app=leetcode id=3658 lang=typescript
 *
 * [3658] GCD of Odd and Even Sums
 */

// @lc code=start
function gcdOfOddEvenSums(n: number): number {
  let sumOdd = n * n;
  let sumEven = n * (n + 1);

  while (sumEven !== 0) {
    const temp = sumEven;
    sumEven = sumOdd % sumEven;
    sumOdd = temp;
  }

  return sumOdd;
};

// Can also just return n as the GCD of n and n + 1 is n
// @lc code=end
