/**
 * 
 * We are to implement a class Solution with a constructor Solution(nums: number[]) that stores 
 * the input array and a method pick(target: number): number that returns a random index i where 
 * nums[i] === target If there are multiple such indices, each must be chosen with equal probability.
 * This is a perfect fit for Reservoir Sampling since the input size is large, 
 * we want to minimize space, and we want to randomly pick one item with uniform probability 
 * without storing all the indices
 * 
 */

class Solution {
  private nums: number[];

  constructor(nums: number[]) {
    this.nums = nums;
  }

  pick(target: number): number {
    let count = 0;
    let result = -1;

    for (let i = 0; i < this.nums.length; i++) {
      if (this.nums[i] === target) {
        count++;
        if (Math.floor(Math.random() * count) === 0) {
          result = i;
        }
      }
    }

    return result;
  }
}
  

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
