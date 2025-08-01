/**
 *
 * We're given an integer array nums. We must return all possible non-decreasing subsequences.
 * A subsequence is a sequence we can derive from the array by deleting some or no elements,
 * without changing the order of the remaining elements. This is a classic backtracking problem.
 * At each index, we have two choices. Include the number or skip the number. But to avoid
 * duplicates, since numbers can repeat, we must track used elements at each recursion level.
 *
 */

function findSubsequences(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(start: number, path: number[]) {
    if (path.length >= 2) {
      result.push([...path]);
    }

    const used = new Set<number>();

    for (let i = start; i < nums.length; i++) {
      if (
        (path.length === 0 || nums[i] >= path[path.length - 1]) &&
        !used.has(nums[i])
      ) {
        used.add(nums[i]);
        path.push(nums[i]);
        backtrack(i + 1, path);
        path.pop();
      }
    }
  }

  backtrack(0, []);
  return result;
}

function main() {
  const testCases: number[][] = [[4, 6, 7, 7], [4, 4, 3, 2, 1], [1, 3, 5], [1]];

  for (const nums of testCases) {
    const result = findSubsequences(nums);
    console.log(`Input: [${nums.join(", ")}]`);
    console.log(`Non-decreasing subsequences:`);
    for (const seq of result) {
      console.log(`  [${seq.join(", ")}]`);
    }
    console.log("---");
  }
}

main();

/**
 *
 * Time complexity is O(2^n)
 * Space complexity is O(n)
 *
 */
