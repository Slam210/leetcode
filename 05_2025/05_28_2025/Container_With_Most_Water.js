/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;

    maxArea = Math.max(maxArea, area);

    // Move the pointer at the shorter line
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
};

const heights = [7, 4, 2, 4, 6, 8, 9, 1, 2];
const result = maxArea(heights);
console.log(result);
