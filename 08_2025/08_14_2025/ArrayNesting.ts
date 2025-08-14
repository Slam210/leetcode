/**
 *
 * We need to determine the size of the largest cycle in a permutation of numbers from 0 to n-1. Each index belongs to
 * exactly one cycle, and starting from that index we can follow jumps until we revisit a number. By marking visited
 * indices as we go, we ensure that each index is processed at most once. The length of the largest cycle encountered
 * during this process is our final answer.
 *
 */

function arrayNesting(nums: number[]): number {
  let visited = new Array(nums.length).fill(false);
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    if (!visited[i]) {
      let count = 0;
      let current = i;
      while (!visited[current]) {
        visited[current] = true;
        current = nums[current];
        count++;
      }
      maxLen = Math.max(maxLen, count);
    }
  }

  return maxLen;
}

function main() {
  console.log(arrayNesting([5, 4, 0, 3, 1, 6, 2]));
  console.log(arrayNesting([0, 1, 2]));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
