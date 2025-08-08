/**
 *
 * We're given an array of integers nums and an integer k, and we need to determine whether there's a
 * contiguous subarray of at least length 2 whose sum is a multiple of k (i.e., sum % k === 0). A
 * brute-force solution would involve checking all possible subarrays, which is inefficient. Instead,
 * we use prefix sums and modulo arithmetic to optimize: the idea is that if the modulo of the cumulative
 * sum at two different indices is the same, the subarray between them has a sum divisible by k. We track
 * the first index where each modulo value appears using a map. If we see the same modulo again later, and
 * the subarray between the two indices is at least 2 elements long, we've found a valid subarray.
 *
 */

function checkSubarraySum(nums: number[], k: number): boolean {
  const modMap = new Map<number, number>();
  modMap.set(0, -1);
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    let mod = k === 0 ? sum : sum % k;

    if (k !== 0 && mod < 0) mod += k;

    if (modMap.has(mod)) {
      const prevIndex = modMap.get(mod)!;
      if (i - prevIndex >= 2) return true;
    } else {
      modMap.set(mod, i);
    }
  }

  return false;
}

function main() {
  console.log(checkSubarraySum([23, 2, 4, 6, 7], 6));
  console.log(checkSubarraySum([23, 2, 6, 4, 7], 6));
  console.log(checkSubarraySum([23, 2, 6, 4, 7], 13));
  console.log(checkSubarraySum([5, 0, 0, 0], 3));
  console.log(checkSubarraySum([1, 2, 3], 0));
}

main();

/**
 *
 * Time complexity is O((n)
 * Space complexity is O(min(n,k))
 *
 */
