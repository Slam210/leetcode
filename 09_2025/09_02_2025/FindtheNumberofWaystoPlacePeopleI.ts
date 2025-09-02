/**
 *
 * We are tasked with counting pairs of points (A, B) where one lies strictly upper-left of the other, and no other
 * points fall inside or on the rectangle they form. To solve this, we consider all possible pairs and validate each
 * by checking that no third point lies within the defined rectangle. This ensures that the pair is unique and
 * unobstructed. While not the most efficient approach, this method gives us a clear way to verify correctness before
 * optimizing further.
 *
 */

function numberOfPairs(points: number[][]): number {
  let ans = 0;
  let n = points.length;
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i];
    for (let j = 0; j < points.length; j++) {
      const pointB = points[j];
      if (i === j || !(pointA[0] <= pointB[0] && pointA[1] >= pointB[1])) {
        continue;
      }

      if (points.length === 2) {
        ans++;
        continue;
      }

      let illegal = false;

      for (const pointTmp of points) {
        if (pointA === pointTmp || pointB === pointTmp) {
          continue;
        }

        const isXContained =
          pointTmp[0] >= pointA[0] && pointTmp[0] <= pointB[0];
        const isYContained =
          pointTmp[1] <= pointA[1] && pointTmp[1] >= pointB[1];

        illegal = isXContained && isYContained;

        if (illegal) {
          break;
        }
      }

      if (!illegal) {
        ans++;
      }
    }
  }

  return ans;
}

function main() {
  const points = [
    [1, 5],
    [4, 2],
    [2, 3],
    [6, 1],
  ];
  console.log(numberOfPairs(points));
}

main();

/**
 *
 * Time complexity is O(n^3)
 * Space complexity is O(1)
 *
 */
