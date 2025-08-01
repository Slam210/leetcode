/**
 *
 * We're given an array nums. You need to find the length of the longest subsequence such that
 * the sum of every pair of adjacent elements has the same parity (even or odd). Since (a + b) % 2
 * depends only on the parity of a and b, the sum is even if both a and b are even or both are odd
 * and odd if one is even and one is odd. So, for the condition to hold the pattern of parity between
 * adjacent elements must be consistent. There are only two valid patterns which are the same parity
 * repeated (all even or all odd) → then (a + b) % 2 == 0 always or alternating even/odd or odd/even →
 * then (a + b) % 2 == 1 always.
 *
 */

function getUniformParityLength(nums: number[]): number {
  let evenCount = 0;
  let oddCount = 0;

  for (const num of nums) {
    if (num % 2 === 0) {
      evenCount++;
    } else {
      oddCount++;
    }
  }

  return Math.max(evenCount, oddCount);
}

function getAlternatingParityLength(nums: number[]): number {
  let maxLength = 0;

  for (let startingParity of [0, 1]) {
    let expectedParity = startingParity;
    let length = 0;

    for (const num of nums) {
      if (num % 2 === expectedParity) {
        length++;
        expectedParity = 1 - expectedParity;
      }
    }

    maxLength = Math.max(maxLength, length);
  }

  return maxLength;
}

function maximumLength(nums: number[]): number {
  const uniform = getUniformParityLength(nums);
  const alternating = getAlternatingParityLength(nums);
  return Math.max(uniform, alternating);
}

function main(): void {
  const nums1 = [3, 1, 2, 4];
  const nums2 = [2, 4, 6, 8];
  const nums3 = [1, 2, 1, 2, 1];
  const nums4 = [1];

  console.log(maximumLength(nums1));
  console.log(maximumLength(nums2));
  console.log(maximumLength(nums3));
  console.log(maximumLength(nums4));
}

main();

/**
 *
 * Run time is O(n)
 * Space complexity is O(1)
 *
 */
