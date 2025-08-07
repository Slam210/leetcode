/**
 *
 * We're given an array w where each element represents the weight or likelihood of picking that index.
 * We must implement pickIndex() so that it returns an index i with probability w[i] / sum(w). The intuition
 * is to use a prefix sum (cumulative sum) array to represent ranges proportionate to the weights, then
 * generate a random number in the total range and use binary search to find where that random number falls.
 * This approach lets us transform the problem from probability into a deterministic search over ranges,
 * for example, weights [1,3] map to ranges [1,4], and a random number in [1,4] is more likely to land in
 * the larger weight's range.
 *
 */

class Solution {
  private prefixSums: number[] = [];
  private total: number = 0;

  constructor(w: number[]) {
    let sum = 0;
    for (const weight of w) {
      sum += weight;
      this.prefixSums.push(sum);
    }
    this.total = sum;
  }

  pickIndex(): number {
    const target = Math.floor(Math.random() * this.total) + 1;

    let left = 0,
      right = this.prefixSums.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (target > this.prefixSums[mid]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }
}

function main() {
  const w = [1, 3, 2];
  const solution = new Solution(w);

  const counts = new Array(w.length).fill(0);
  const trials = 10000;

  for (let i = 0; i < trials; i++) {
    const picked = solution.pickIndex();
    counts[picked]++;
  }

  console.log("Distribution after", trials, "trials:");
  for (let i = 0; i < counts.length; i++) {
    const probability = ((counts[i] / trials) * 100).toFixed(2);
    console.log(`Index ${i}: ${counts[i]} picks (${probability}%)`);
  }
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
