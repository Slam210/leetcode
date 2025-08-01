import largestRectangleArea from "./LargestRectangleinHistogram.js";

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  if (!matrix.length || !matrix[0].length) return 0;

  const cols = matrix[0].length;
  const heights = Array(cols).fill(0);
  let maxArea = 0;

  for (let row of matrix) {
    for (let i = 0; i < cols; i++) {
      heights[i] = row[i] === "1" ? heights[i] + 1 : 0;
    }

    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
};

console.log(
  maximalRectangle([
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ])
);
