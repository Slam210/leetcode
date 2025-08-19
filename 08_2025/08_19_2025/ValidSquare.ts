/**
 *
 * We are given four points in 2D space. We must determine if they form a valid square. Unlike axis-aligned squares, a
 * square can be rotated, so we must use a geometry-based approach that works in all orientations. A square has 4 equal
 * sides and 2 equal diagonals. If we compute the squared distances between every pair of the 4 points, then there should
 * be exactly 2 distinct values. The smaller value should occur 4 times. The larger value should occur 2 times. The larger
 * must be exactly twice the smaller.
 *
 */

function validSquare(
  p1: number[],
  p2: number[],
  p3: number[],
  p4: number[]
): boolean {
  function distance(p: number[], q: number[]): number {
    const dx = p[0] - q[0];
    const dy = p[1] - q[1];
    return dx * dx + dy * dy;
  }

  const points = [p1, p2, p3, p4];
  const dists: number[] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      dists.push(distance(points[i], points[j]));
    }
  }

  dists.sort((a, b) => a - b);

  return (
    dists[0] > 0 &&
    dists[0] === dists[1] &&
    dists[1] === dists[2] &&
    dists[2] === dists[3] &&
    dists[4] === dists[5] &&
    dists[4] === 2 * dists[0]
  );
}

function main() {
  console.log(validSquare([0, 0], [1, 0], [1, 1], [0, 1]));
  console.log(validSquare([0, 0], [2, 0], [2, 1], [0, 1]));
  console.log(validSquare([0, 0], [0, 0], [1, 1], [1, 0]));
  console.log(validSquare([1, 1], [2, 2], [1, 2], [2, 1]));
}

main();

/**
 *
 * Time complexity is O(1)
 * Space complexity is O(1)
 *
 */
