/*

The intuition behind this problem is to calculate the area and subtract it
from the overlap area. The overlap area can be calculated by take the max and mins and the
respective axises.

*/

/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  const area1 = (ax2 - ax1) * (ay2 - ay1);
  const area2 = (bx2 - bx1) * (by2 - by1);

  const overlapWidth = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
  const overlapHeight = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
  const overlapArea = overlapWidth * overlapHeight;

  return area1 + area2 - overlapArea;
};

console.log(computeArea(-3, 0, 3, 4, 0, -1, 9, 2));

/*

Run time is O(1)
Space time is O(1)

*/
