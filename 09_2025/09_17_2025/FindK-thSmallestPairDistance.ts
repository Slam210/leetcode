/**
 *
 * We want to find the k-th smallest absolute difference among pairs in an array.
 * While the brute-force way of generating and sorting all pair distances is inefficient,
 * we can do better by recognizing structure. By sorting the array, differences between
 * pairs increase predictably, which lets us count pairs efficiently using a two-pointer
 * sliding window. We then binary search over the possible distance range, checking how many
 * pairs are within each candidate distance. This efficient narrowing down of possibilities
 * allows us to reach the k-th smallest distance much faster than brute force.
 *
 */

export default function smallestDistancePair(
  nums: number[],
  k: number
): number {
  nums.sort((a, b) => a - b);

  function countPairs(mid: number): number {
    let count = 0;
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
      while (nums[right] - nums[left] > mid) {
        left++;
      }
      count += right - left;
    }
    return count;
  }

  let left = 0;
  let right = nums[nums.length - 1] - nums[0];
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (countPairs(mid) >= k) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

function main() {
  const nums = [1, 3, 1];
  const k = 1;
  console.log(smallestDistancePair(nums, k));
}

main();

/**
 *
 * Time complexity is O(n log(n) + nlog(w))
 * Space complexity is O(1)
 *
 */
