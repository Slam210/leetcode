/*

The idea behind this problem is to sort the inital array. We then move in steps of
3 forming arrays. After each array is formed, we check the first and last element to
check if there is a kth difference. If there is, we return [], otherwise continue.

*/

function divideArray(nums: number[], k: number): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];

  for (let i = 0; i < nums.length; i += 3) {
    const group = [nums[i], nums[i + 1], nums[i + 2]];
    if (group[2] - group[0] > k) return [];
    res.push(group);
  }

  return res;
}

console.log(divideArray([1, 3, 5, 2, 4, 6], 2));

/*

Since we sort, the run time is O(n log(n))
Space complexity is O(n) as our result array hold the original elements

*/
