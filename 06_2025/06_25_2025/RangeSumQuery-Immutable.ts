/**
 *
 * The problem is asking us to define two functions.
 * The constructor which takes an array and sets nums to it.
 * A function called sumRange which will take in left and right, summing those indexes.
 * To solve this, we can use prefix sums when creating the initial array, which will allow
 * us to compute the sums in O(1) time.
 *
 */

class NumArray {
  private prefixSums: number[];

  // The constructor generates the sum of all indexes, that way we only need to subtract the left and right to get the ranged sum
  constructor(nums: number[]) {
    this.prefixSums = [0];
    for (let i = 0; i < nums.length; i++) {
      this.prefixSums.push(this.prefixSums[i] + nums[i]);
    }
  }

  // The idea behind this function is to return the right sum minus the left sum which will get us
  // the inclusive range
  sumRange(left: number, right: number): number {
    return this.prefixSums[right + 1] - this.prefixSums[left];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */

const nums = [-2, 0, 3, -5, 2, -1];
const obj = new NumArray(nums);
console.log(obj.sumRange(0, 2));

/**
 *
 * Run time is O(n)
 * Space time is O(1)
 *
 */
