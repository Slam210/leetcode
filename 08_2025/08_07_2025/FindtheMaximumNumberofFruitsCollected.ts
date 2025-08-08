/**
 *
 * We're given a square grid n x n where each cell contains a number of fruits. Three children start
 * from three corners of the grid: top-left (0,0), top-right (0,n-1), and bottom-left (n-1,0). All
 * children must reach the bottom-right (n-1,n-1) using exactly n-1 moves, but each follows different
 * movement rules. If multiple children land on the same cell, fruits are only counted once. The goal
 * is to find the maximum total number of fruits collected by all children combined. The intuition is
 * to treat this as a multi-agent path optimization problem. Since the children’s movements are constrained
 * and the number of steps is fixed, we can use dynamic programming (DP) with memoization to simulate all
 * valid moves simultaneously, ensuring shared cell handling.
 *
 */

function maxCollectedFruits(fruits: number[][]): number {
  const n = fruits.length;
  const memo = new Map<string, number>();

  // Check if a cell is within grid bounds
  function isValid(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < n && y < n;
  }

  // Directions for Child A (top-left): down, right, down-right
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
  ];

  // dp(x1, x2, x3, t): max fruits collected when children A, B, C are at x1, x2, x3 on step t
  function dp(x1: number, x2: number, x3: number, t: number): number {
    const y1 = t - x1;
    const y2 = t - x2;
    const y3 = t - x3;

    // If any position is out of bounds, discard this path
    if (!isValid(x1, y1) || !isValid(x2, y2) || !isValid(x3, y3)) {
      return -Infinity;
    }

    const key = `${x1},${x2},${x3},${t}`;
    if (memo.has(key)) return memo.get(key)!;

    // Collect fruits from all 3 positions (no double-counting via Set)
    const positions = new Set<string>();
    positions.add(`${x1},${y1}`);
    positions.add(`${x2},${y2}`);
    positions.add(`${x3},${y3}`);

    let fruitsCollected = 0;
    for (const pos of positions) {
      const [x, y] = pos.split(",").map(Number);
      fruitsCollected += fruits[x][y];
    }

    // Base case: all children have reached (n-1, n-1)
    if (t === n - 1) {
      memo.set(key, fruitsCollected);
      return fruitsCollected;
    }

    let maxNext = -Infinity;

    // Try all 27 movement combinations: 3 moves per child
    for (const [dx1, dy1] of directions) {
      for (const [dx2, dy2] of [
        [1, -1],
        [1, 0],
        [1, 1],
      ]) {
        for (const [dx3, dy3] of [
          [-1, 1],
          [0, 1],
          [1, 1],
        ]) {
          const nextX1 = x1 + dx1;
          const nextX2 = x2 + dx2;
          const nextX3 = x3 + dx3;
          const res = dp(nextX1, nextX2, nextX3, t + 1);
          maxNext = Math.max(maxNext, res);
        }
      }
    }

    // Store and return the best result from this state
    memo.set(key, fruitsCollected + maxNext);
    return fruitsCollected + maxNext;
  }

  // Start with children at (0,0), (0,n-1), (n-1,0) and step 0
  return dp(0, 0, n - 1, 0);
}

function main() {
  const fruits = [
    [1, 2, 3],
    [0, 0, 4],
    [7, 6, 5],
  ];
  const result = maxCollectedFruits(fruits);
  console.log("Maximum fruits collected:", result);
}

main();

/**
 *
 * Time complexity is O(n^3)
 * Space complexity is O(n)
 *
 */
