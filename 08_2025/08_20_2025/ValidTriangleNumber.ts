/**
 *
 * We want to count the number of triplets in the array that can form triangles. By sorting the array, we know the
 * largest side will always appear at the right. For each potential largest side, we can use two pointers to check
 * how many smaller pairs satisfy the triangle inequality. If the sum of the two smaller sides is greater than the
 * largest side, then all combinations between them are valid triangles. This lets us efficiently count valid triplets
 * without checking every combination individually.
 *
 */

function triangleNumber(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let count = 0;
  let n = nums.length;

  for (let k = n - 1; k >= 2; k--) {
    let i = 0,
      j = k - 1;
    while (i < j) {
      if (nums[i] + nums[j] > nums[k]) {
        count += j - i;
        j--;
      } else {
        i++;
      }
    }
  }

  return count;
}

function main() {
  console.log(triangleNumber([2, 2, 3, 4]));
  console.log(triangleNumber([4, 2, 3, 4]));
}

main();

/**
 *
 * Time complexity is O(n^2)
 * Space complexity is O(1) ignoring the sorting cost
 *
 */
