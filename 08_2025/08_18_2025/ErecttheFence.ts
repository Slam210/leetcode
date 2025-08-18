/**
 *
 * We are given points representing trees and must enclose all of them with the minimum rope.
 * This is equivalent to finding the convex hull of the point set which is the smallest convex
 * polygon that contains all the points. Points on the hull are exactly those on the fence perimeter.
 * We start by sorting points by x, then y. We build the lower hull by walking left → right, ensuring
 * we only keep counter-clockwise turns. Build the upper hull by walking right → left, same rule.
 * Concatenate them. Then because collinear boundary points must be included, we adjust the turn check
 * to allow them.
 *
 */

function outerTrees(trees: number[][]): number[][] {
  // Checks orientation of (o → a → b)
  function cross(o: number[], a: number[], b: number[]): number {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  }

  // Sort points by x, then y
  trees.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  const lower: number[][] = [];
  for (const p of trees) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) < 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: number[][] = [];
  for (let i = trees.length - 1; i >= 0; i--) {
    const p = trees[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) < 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }

  // Merge and remove duplicates
  const hull = [...lower, ...upper];
  const unique: number[][] = [];
  const seen = new Set<string>();

  for (const p of hull) {
    const key = p.toString();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(p);
    }
  }

  return unique;
}

function main() {
  console.log(
    outerTrees([
      [1, 1],
      [2, 2],
      [2, 0],
      [2, 4],
      [3, 3],
      [4, 2],
    ])
  );
  console.log(
    outerTrees([
      [1, 2],
      [2, 2],
      [4, 2],
    ])
  );
}

main();
