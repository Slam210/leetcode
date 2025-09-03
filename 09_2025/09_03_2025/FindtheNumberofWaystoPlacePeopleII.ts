/**
 *
 * If we sort points by x ascending (and for ties, by y descending), we ensure Alice always appears before Bob
 * in the ordering. For a fixed Alice point, when scanning potential Bob points, we can maintain dynamic bounds
 * that prevent any intermediate points from being enclosed. This way, once we accept a pair (Alice, Bob), we
 * can safely move the ranges so that no third point invalidates the condition for future pairs.
 *
 */

function numberOfPairs(points: number[][]): number {
  let ans = 0;

  points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  for (let i = 0; i < points.length - 1; i++) {
    const pointA = points[i];
    const xRange = [pointA[0] - 1, Infinity];
    const yRange = [-Infinity, pointA[1] + 1];

    for (let j = i + 1; j < points.length; j++) {
      const pointB = points[j];

      if (
        pointB[0] > xRange[0] &&
        pointB[0] < xRange[1] &&
        pointB[1] > yRange[0] &&
        pointB[1] < yRange[1]
      ) {
        ans++;
        xRange[0] = pointB[0];
        yRange[0] = pointB[1];
      }
    }
  }

  return ans;
}

/**
 *
 * Time complexity is O(n^2)
 * Space complexity is O(1)
 *
 */
