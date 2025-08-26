function findErrorNums(nums: number[]): number[] {
  let n = nums.length;
  let seen = new Set<number>();
  let duplicate = -1;
  let sum = 0;

  for (const num of nums) {
    if (seen.has(num)) {
      duplicate = num;
    }
    seen.add(num);
    sum += num;
  }

  let expectedSum = (n * (n + 1)) / 2;
  let missing = expectedSum - (sum - duplicate);

  return [duplicate, missing];
}

function main() {
  console.log(findErrorNums([1, 2, 2, 4]));
  console.log(findErrorNums([1, 1]));
  console.log(findErrorNums([2, 2]));
  console.log(findErrorNums([3, 2, 2]));
}

main();
