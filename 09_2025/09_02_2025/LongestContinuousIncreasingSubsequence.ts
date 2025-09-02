function findLengthOfLCIS(nums: number[]): number {
  if (nums.length === 0) return 0;

  let currLen = 1;
  let maxLen = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      currLen++;
    } else {
      currLen = 1;
    }
    maxLen = Math.max(maxLen, currLen);
  }

  return maxLen;
}

function main() {
  console.log(findLengthOfLCIS([1, 3, 5, 4, 7]));
  console.log(findLengthOfLCIS([2, 2, 2, 2, 2]));
  console.log(findLengthOfLCIS([1, 2, 3, 4, 5]));
}

main();
