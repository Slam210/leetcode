export default function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

function main(): void {
  console.log(search([-1, 0, 3, 5, 9, 12], 9));
  console.log(search([-1, 0, 3, 5, 9, 12], 2));
  console.log(search([1], 1));
  console.log(search([], 5));
}

main();
