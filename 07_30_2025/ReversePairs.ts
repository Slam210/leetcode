/**
 *
 * To solve the Reverse Pairs problem, we want to count how many index pairs (i, j) in the array
 * satisfy i < j and nums[i] > 2 * nums[j]. A brute-force approach would compare every pair,
 * resulting in O(n²) time. However, we can optimize this by recognizing that this is a variation
 * of the inversion count problem, and can be solved in O(n log n) time using a modified merge sort.
 * During the merge step, while merging two sorted halves, we count how many elements in the right
 * half form a reverse pair with elements in the left half (i.e., how many nums[j]
 * satisfy nums[i] > 2 * nums[j]). Since the halves are sorted, we can do this efficiently using a
 * two-pointer approach. After counting, we proceed with a standard merge to keep the array sorted
 * for subsequent steps.
 *
 */

function reversePairs(nums: number[]): number {
  // Modified merge sort that returns the count of reverse pairs
  function mergeSort(start: number, end: number): number {
    // Base case: single element has no reverse pair
    if (end - start <= 1) return 0;

    const mid = Math.floor((start + end) / 2);

    // Recursively count in left and right halves
    let count = mergeSort(start, mid) + mergeSort(mid, end);

    // Count cross pairs where nums[i] > 2 * nums[j] with i in left and j in right
    let j = mid;
    for (let i = start; i < mid; i++) {
      // Move j forward while nums[i] > 2 * nums[j] holds
      while (j < end && nums[i] > 2 * nums[j]) j++;
      // All nums[mid...j-1] are valid reverse pairs with nums[i]
      count += j - mid;
    }

    // Standard merge step to keep array sorted
    const sorted: number[] = [];
    let left = start,
      right = mid;

    while (left < mid && right < end) {
      if (nums[left] <= nums[right]) {
        sorted.push(nums[left++]);
      } else {
        sorted.push(nums[right++]);
      }
    }

    // Append any remaining elements
    while (left < mid) sorted.push(nums[left++]);
    while (right < end) sorted.push(nums[right++]);

    // Write merged result back into nums
    for (let i = 0; i < sorted.length; i++) {
      nums[start + i] = sorted[i];
    }

    return count;
  }

  // Start the modified merge sort on the full array
  return mergeSort(0, nums.length);
}

function main() {
  const testCases: number[][] = [
    [1, 3, 2, 3, 1],
    [2, 4, 3, 5, 1],
    [5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5],
    [0, 0, 0, 0],
  ];

  for (const nums of testCases) {
    const result = reversePairs([...nums]);
    console.log(`nums = [${nums.join(", ")}] → Reverse Pairs: ${result}`);
  }
}

main();

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(n)
 *
 */
