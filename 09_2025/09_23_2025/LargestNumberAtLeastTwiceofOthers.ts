function dominantIndex(nums: number[]): number {
  let maxVal = -Infinity,
    secondMax = -Infinity;
  let maxIndex = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxVal) {
      secondMax = maxVal;
      maxVal = nums[i];
      maxIndex = i;
    } else if (nums[i] > secondMax) {
      secondMax = nums[i];
    }
  }

  return maxVal >= 2 * secondMax ? maxIndex : -1;
}

function main() {
  console.log(dominantIndex([3, 6, 1, 0]));
  console.log(dominantIndex([1, 2, 3, 4]));
  console.log(dominantIndex([0, 0, 0, 1]));
  console.log(dominantIndex([10]));
}

main();
