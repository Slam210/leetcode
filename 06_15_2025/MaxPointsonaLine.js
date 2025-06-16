/*

The intuition behind this problem is to use each point as an anchor.
For every point with the same slope, we can add it to the line.
If multiple points share the same slope, they are part of the same line.
We repeat and find the max as we iterate through the array

*/

/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
  if (points.length <= 2) return points.length;

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  let maxPoints = 0;

  for (let i = 0; i < points.length; i++) {
    const slopes = new Map();
    let duplicate = 1;
    let currMax = 0;

    for (let j = i + 1; j < points.length; j++) {
      let [x1, y1] = points[i];
      let [x2, y2] = points[j];

      let dx = x2 - x1;
      let dy = y2 - y1;

      if (dx === 0 && dy === 0) {
        duplicate++;
        continue;
      }

      const d = gcd(dx, dy);
      dx /= d;
      dy /= d;

      if (dx < 0) {
        dx = -dx;
        dy = -dy;
      }

      const slopeKey = `${dy}/${dx}`;
      slopes.set(slopeKey, (slopes.get(slopeKey) || 0) + 1);
      currMax = Math.max(currMax, slopes.get(slopeKey));
    }

    maxPoints = Math.max(maxPoints, currMax + duplicate);
  }

  return maxPoints;
};

/*

Run time is O(n²) since we check each pooitn with every other.
Space time is O(n) since we use a map of slopes per point

*/
