/**
 *
 * The problem is the same as the Range Sum Query - Immutable, except we now
 * have an update function that can change the values in the function. Rather than
 * using prefux sums, which cannot handle updates efficiently, we can use a binary
 * indexed tree. This improves our time from O(n) in the worst case to O(log(n)).
 *
 */

class NumArray {
  private nums: number[];
  private tree: number[];
  private n: number;

  // Climbs up to inform all upper floors of a new change.
  private add(i: number, val: number): void {
    while (i <= this.n) {
      this.tree[i] += val;
      i += i & -i;
    }
  }

  // Walks down to collect all values relevant to a room
  private prefixSum(i: number): number {
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i;
    }
    return sum;
  }

  constructor(nums: number[]) {
    this.n = nums.length;
    this.nums = [...nums];
    this.tree = new Array(this.n + 1).fill(0);
    for (let i = 0; i < this.n; i++) {
      this.add(i + 1, nums[i]);
    }
  }

  update(index: number, val: number): void {
    const diff = val - this.nums[index];
    this.nums[index] = val;
    this.add(index + 1, diff);
  }

  sumRange(left: number, right: number): number {
    return this.prefixSum(right + 1) - this.prefixSum(left);
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */

const obj = new NumArray([1, 3, 5]);
console.log(obj.sumRange(0, 2));
obj.update(1, 2);
console.log(obj.sumRange(0, 2));
