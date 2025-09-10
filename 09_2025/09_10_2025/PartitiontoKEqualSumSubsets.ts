/**
 *
 * We begin by checking if the total sum of the array can be evenly split into k parts.
 * If not, the task is impossible. If it can, we compute the target sum per subset and
 * sort the numbers in descending order for efficiency. We then attempt to place each
 * number into one of the k subsets, ensuring no bucket exceeds the target. If we can
 * place all numbers successfully, the partition exists; otherwise, we backtrack. By pruning states that cannot succeed and avoiding duplicate work, we can efficiently determine if the partition is possible.
 *
 */

export default function canPartitionKSubsets(
  nums: number[],
  k: number
): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % k !== 0) return false;
  const target = total / k;

  nums.sort((a, b) => b - a);
  if (nums[0] > target) return false;

  const buckets = new Array(k).fill(0);

  function dfs(index: number): boolean {
    if (index === nums.length) return true;
    const num = nums[index];

    for (let i = 0; i < k; i++) {
      if (buckets[i] + num <= target) {
        buckets[i] += num;
        if (dfs(index + 1)) return true;
        buckets[i] -= num;
      }
      if (buckets[i] === 0) break;
    }

    return false;
  }

  return dfs(0);
}

function main(): void {
  const cases = [
    { nums: [4, 3, 2, 3, 5, 2, 1], k: 4, expected: true },
    { nums: [1, 2, 3, 4], k: 3, expected: false },
    { nums: [2, 2, 2, 2, 3, 4, 5], k: 4, expected: false },
    { nums: [2, 2, 2, 2, 2, 2], k: 3, expected: true },
  ];

  for (const [i, c] of cases.entries()) {
    const result = canPartitionKSubsets(c.nums, c.k);
    console.log(`Case ${i + 1}: result=${result}, expected=${c.expected}`);
  }
}

main();

/**
 *
 * Time complexity is O(k)
 * Space complexity is O(n)
 *
 */
