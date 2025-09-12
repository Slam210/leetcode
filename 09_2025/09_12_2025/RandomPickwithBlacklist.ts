/**
 *
 * We can think of the problem as shrinking the selection range to the first validSize numbers,
 * which guarantees the correct probability. If some numbers in this smaller range are blacklisted,
 * we remap them into the extra space at the end of the original range. By building this mapping once
 * in the constructor, we ensure every pick is just one random call plus a dictionary lookup.
 */

export default class Solution {
  private mapping: Map<number, number>;
  private validSize: number;

  constructor(n: number, blacklist: number[]) {
    this.mapping = new Map();
    this.validSize = n - blacklist.length;

    const blackSet = new Set(blacklist);
    const available: number[] = [];

    // collect numbers in [validSize, n-1] that are not blacklisted
    for (let x = this.validSize; x < n; x++) {
      if (!blackSet.has(x)) {
        available.push(x);
      }
    }

    // map blacklisted numbers < validSize to available safe numbers
    let idx = 0;
    for (let b of blacklist) {
      if (b < this.validSize) {
        this.mapping.set(b, available[idx++]);
      }
    }
  }

  pick(): number {
    const x = Math.floor(Math.random() * this.validSize);
    return this.mapping.has(x) ? this.mapping.get(x)! : x;
  }
}

function main(): void {
  const obj = new Solution(7, [2, 3, 5]);
  const results: number[] = [];
  for (let i = 0; i < 10; i++) {
    results.push(obj.pick());
  }
  console.log("Random picks (10 trials):", results);
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(m)
 *
 */
