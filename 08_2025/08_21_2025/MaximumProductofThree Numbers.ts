function maximumProduct(nums: number[]): number {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const prod1 = nums[n - 1] * nums[n - 2] * nums[n - 3];
  const prod2 = nums[0] * nums[1] * nums[n - 1];
  return Math.max(prod1, prod2);
}

function main() {
  console.log(maximumProduct([1, 2, 3]));
  console.log(maximumProduct([1, 2, 3, 4]));
  console.log(maximumProduct([-10, -10, 5, 2]));
}

main();
