function findMaxAverage(nums: number[], k: number): number {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  let maxSum = sum;

  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    if (sum > maxSum) {
      maxSum = sum;
    }
  }

  return maxSum / k;
}

function main() {
  console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));
  console.log(findMaxAverage([5], 1));
}
main();
