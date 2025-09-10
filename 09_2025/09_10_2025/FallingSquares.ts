/**
 *
 * We view each square as an interval on the X-axis, and its final resting height depends on the tallest overlapping stack before it.
 * When a new square drops, we scan previously placed squares to see which ones overlap in horizontal space. The new square lands at
 * the maximum of those heights, plus its own side length. If there are no overlaps, it rests on the ground. After placing it, we update
 * the global maximum and record it. By repeating this for each square, we simulate the process and track the tallest stack at each step.
 *
 */

export default function fallingSquares(positions: number[][]): number[] {
  const result: number[] = [];
  const intervals: { left: number; right: number; height: number }[] = [];
  let maxHeightSoFar = 0;

  // Process each square in the order they are dropped.
  for (const [left, size] of positions) {
    const right = left + size;
    let baseHeight = 0;

    // check overlap with previous squares
    for (const sq of intervals) {
      if (sq.right > left && right > sq.left) {
        // If overlapping, the base height must be at least as tall as the square it touches.
        baseHeight = Math.max(baseHeight, sq.height);
      }
    }

    const newHeight = baseHeight + size;
    intervals.push({ left, right, height: newHeight });

    maxHeightSoFar = Math.max(maxHeightSoFar, newHeight);
    result.push(maxHeightSoFar);
  }

  return result;
}

function main(): void {
  const cases = [
    {
      positions: [
        [1, 2],
        [2, 3],
        [6, 1],
      ],
      expected: [2, 5, 5],
    },
    {
      positions: [
        [100, 100],
        [200, 100],
      ],
      expected: [100, 100],
    },
    {
      positions: [
        [1, 2],
        [2, 3],
        [3, 1],
      ],
      expected: [2, 5, 5],
    },
  ];

  for (const [i, c] of cases.entries()) {
    const result = fallingSquares(c.positions);
    console.log(
      `Case ${i + 1}: result=${JSON.stringify(
        result
      )}, expected=${JSON.stringify(c.expected)}`
    );
  }
}

main();

/**
 *
 * Time complexity is O(n^2)
 * Space complexity is O(n)
 *
 */
