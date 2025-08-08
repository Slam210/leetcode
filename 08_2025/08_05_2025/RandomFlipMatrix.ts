/**
 *
 * We have an initially all-zero m x n binary matrix. Each time flip() is called we must randomly
 * pick a zero-valued cell, flip it to 1, and return its index. All zero cells must be equally
 * likely to be picked. The reset() function must reset the matrix to all zeros. Instead of storing
 * the entire matrix, treat it as a flattened 1D array of size m * n. Each flip() randomly picks a
 * position rand in the remaining 0 values and flips it to 1.
 *
 */

class Solution {
  private m: number;
  private n: number;
  private total: number;
  private map: Map<number, number>;

  constructor(m: number, n: number) {
    this.m = m;
    this.n = n;
    this.total = m * n;
    this.map = new Map();
  }

  flip(): number[] {
    const rand = Math.floor(Math.random() * this.total);
    const x = this.map.get(rand) ?? rand;

    this.total--;

    // Simulate the removal of 'rand' by swapping it with 'total'
    const last = this.map.get(this.total) ?? this.total;
    this.map.set(rand, last);

    return [Math.floor(x / this.n), x % this.n];
  }

  reset(): void {
    this.map.clear();
    this.total = this.m * this.n;
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(m, n)
 * var param_1 = obj.flip()
 * obj.reset()
 */

/**
 *
 * Time Complexity is O(1) for both
 * Space complexity is O(k) for flip and O(1) for reset
 *
 */
