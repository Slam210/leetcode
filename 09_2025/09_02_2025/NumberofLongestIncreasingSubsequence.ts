/**
 *
 * We need the number of longest increasing subsequences in an array. To solve this, we use dynamic programming
 * where for each element we track both the LIS length ending there and how many subsequences achieve that length.
 * By extending subsequences from earlier indices and carefully counting when new maximums are formed or tied,
 * we can build up the correct count. At the end, summing the counts of all indices that reach the global LIS
 * length gives the answer.
 *
 */

function findNumberOfLIS(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;

  const length = new Array(n).fill(1);
  const count = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (length[j] + 1 > length[i]) {
          length[i] = length[j] + 1;
          count[i] = count[j];
        } else if (length[j] + 1 === length[i]) {
          count[i] += count[j];
        }
      }
    }
  }

  const maxLen = Math.max(...length);
  let result = 0;
  for (let i = 0; i < n; i++) {
    if (length[i] === maxLen) {
      result += count[i];
    }
  }

  return result;
}

function main() {
  console.log(findNumberOfLIS([1, 3, 5, 4, 7]));
  console.log(findNumberOfLIS([2, 2, 2, 2, 2]));
}

main();

/**
 *
 * Time complexity is O(n^2)
 * Space complexity is O(n)
 *
 */
