/**
 *
 * We want to compute the triangular sum of a digit array by repeatedly replacing the array with
 * a new one, where each element is the modulo 10 sum of consecutive elements. By iteratively
 * applying this process until only one element remains, we can determine the final triangular
 * sum efficiently. This method ensures correctness by directly simulating the reduction process step by step.
 *
 */

function triangularSum(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  while (nums.length > 1) {
    let newNums: number[] = [];
    for (let i = 0; i < nums.length - 1; i++) {
      newNums.push((nums[i] + nums[i + 1]) % 10);
    }
    nums = newNums;
  }

  return nums[0];
}

function main() {
  const nums = [2, 5, 3, 7, 1];
  console.log("Triangular Sum:", triangularSum(nums));
}

main();

/**
 *
 * Time complexity is O(n^2)
 * Space complexity is O(n)
 *
 */
