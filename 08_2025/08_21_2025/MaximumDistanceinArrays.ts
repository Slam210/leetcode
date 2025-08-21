/**
 *
 * We need the maximum distance between values chosen from two different sorted arrays. Since each array is sorted, the
 * minimum and maximum elements are at the ends, and the largest absolute difference must involve one array’s extreme
 * value against another array’s extreme. By tracking the global minimum and maximum seen so far as we iterate, we can
 * compare each array’s extremes against them to compute potential maximum distances. This avoids quadratic comparisons
 * while ensuring correctness.
 *
 */

function maxDistance(arrays: number[][]): number {
  let globalMin = arrays[0][0];
  let globalMax = arrays[0][arrays[0].length - 1];
  let maxDist = 0;

  for (let i = 1; i < arrays.length; i++) {
    const curMin = arrays[i][0];
    const curMax = arrays[i][arrays[i].length - 1];

    maxDist = Math.max(
      maxDist,
      Math.abs(curMax - globalMin),
      Math.abs(globalMax - curMin)
    );

    globalMin = Math.min(globalMin, curMin);
    globalMax = Math.max(globalMax, curMax);
  }

  return maxDist;
}

function main() {
  console.log(
    maxDistance([
      [1, 2, 3],
      [4, 5],
      [1, 2, 3],
    ])
  );
  console.log(maxDistance([[1], [1]]));
  console.log(
    maxDistance([
      [1, 4],
      [0, 5],
    ])
  );
}

main();

/**
 *
 * Time complexity is O(m)
 * Space complexity is O(1)
 *
 */
