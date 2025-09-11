class KthLargest {
  private k: number;
  private nums: number[];

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.nums = nums.sort((a, b) => b - a).slice(0, k);
  }

  add(val: number): number {
    let i = 0;
    while (i < this.nums.length && this.nums[i] > val) {
      i++;
    }
    this.nums.splice(i, 0, val);

    if (this.nums.length > this.k) {
      this.nums.pop();
    }

    return this.nums[this.k - 1];
  }
}

function main(): void {
  const kth = new KthLargest(3, [4, 5, 8, 2]);
  console.log(kth.add(3));
  console.log(kth.add(5));
  console.log(kth.add(10));
  console.log(kth.add(9));
  console.log(kth.add(4));
}

main();
