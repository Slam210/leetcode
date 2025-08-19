/**
 *
 * When we are given an array, our task is to find how many subarrays consist only of zeros. We can see that
 * consecutive sequences of zeros form many subarrays, not just one. For example, a streak of three zeros
 * actually gives us six different subarrays. More generally, if we encounter a streak of length k, the total
 * subarrays formed from that streak is k*(k+1)/2. By scanning through the array, grouping consecutive zeros,
 * and applying this formula to each group, we can efficiently calculate the final count.
 *
 */

function zeroFilledSubarray(nums: number[]): number {
  let count = 0;
  let streak = 0;

  for (let num of nums) {
    if (num === 0) {
      streak++;
    } else {
      count += (streak * (streak + 1)) / 2;
      streak = 0;
    }
  }

  if (streak > 0) {
    count += (streak * (streak + 1)) / 2;
  }

  return count;
}

function main() {
  const nums1 = [0, 0, 0];
  console.log("Input:", nums1, "=> Output:", zeroFilledSubarray(nums1));

  const nums2 = [1, 0, 0, 1, 0];
  console.log("Input:", nums2, "=> Output:", zeroFilledSubarray(nums2));

  const nums3 = [1, 2, 3];
  console.log("Input:", nums3, "=> Output:", zeroFilledSubarray(nums3));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
