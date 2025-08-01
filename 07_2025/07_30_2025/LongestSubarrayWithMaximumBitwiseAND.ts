/**
 *
 * Given an integer array nums, find the length of the longest subarray such that the bitwise AND
 * of the subarray equals the maximum possible bitwise AND value of any subarray in nums. Once we
 * know the maximum number, we just need to find the longest contiguous sequence of elements equal
 * to this number, because the AND of the same number repeated is the number itself and the AND
 * drops as soon as a smaller number is included.
 *
 */

function longestSubarray(nums: number[]): number {
  const maxNum = Math.max(...nums);
  let maxLen = 0;
  let currentLen = 0;

  for (const num of nums) {
    if (num === maxNum) {
      currentLen += 1;
      maxLen = Math.max(maxLen, currentLen);
    } else {
      currentLen = 0;
    }
  }

  return maxLen;
}

function main() {
  const testCases: number[][] = [
    [1, 2, 3, 3, 2],
    [1, 2, 3, 4],
    [4, 4, 4],
    [1],
    [3, 3, 2, 3, 3, 3, 1],
    [0, 0, 0],
    [5, 5, 1, 5, 5, 5, 0],
  ];

  for (const nums of testCases) {
    const result = longestSubarray(nums);
    console.log(
      `Array: [${nums.join(", ")}] → Longest max-AND subarray length: ${result}`
    );
  }
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
