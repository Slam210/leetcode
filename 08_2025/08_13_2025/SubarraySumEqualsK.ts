/**
 *
 * We have an array nums and an integer k. We need to count how many contiguous subarrays have a sum equal
 * to k. So for each prefixSum[i], the number of subarrays ending at i with sum k is the number of times
 * prefixSum[i] - k has been seen before. We can use a hashmap.
 *
 */

function subarraySum(nums: number[], k: number): number {
  let count = 0;
  let sum = 0;
  const map = new Map<number, number>();
  map.set(0, 1);

  for (const num of nums) {
    sum += num;
    if (map.has(sum - k)) {
      count += map.get(sum - k)!;
    }
    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
}

function main(): void {
  console.log(subarraySum([1, 1, 1], 2));
  console.log(subarraySum([1, 2, 3], 3));
  console.log(subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
