export default function findShortestSubArray(nums: number[]): number {
  const count: Map<number, number> = new Map();
  const first: Map<number, number> = new Map();
  const last: Map<number, number> = new Map();

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (!first.has(x)) first.set(x, i);
    last.set(x, i);
    count.set(x, (count.get(x) || 0) + 1);
  }

  let degree = 0;
  for (const freq of count.values()) {
    degree = Math.max(degree, freq);
  }

  let minLen = Infinity;
  for (const [num, freq] of count.entries()) {
    if (freq === degree) {
      const len = last.get(num)! - first.get(num)! + 1;
      minLen = Math.min(minLen, len);
    }
  }

  return minLen;
}
