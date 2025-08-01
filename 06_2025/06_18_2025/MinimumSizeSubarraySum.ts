/*

The intuition behind this code is to use a sliding window technique to figure
out the minimum length at each pointer we hit the target value. Since we do not
need to return the values themselves, we can simply return the count which is overwritten
each time a smaller value is found.

*/

function minSubArrayLen(target: number, nums: number[]): number {
  let start = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let end = 0; end < nums.length; end++) {
    sum += nums[end];
    while (sum >= target) {
      minLen = Math.min(minLen, end - start + 1);
      sum -= nums[start];
      start++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

const target = 7;
const nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(target, nums));

/*

Run time is O(n)
Space time is O(1)

*/
