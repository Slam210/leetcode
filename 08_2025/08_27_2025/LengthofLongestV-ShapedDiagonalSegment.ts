/**
 *
 * We need to find the longest diagonal sequence that starts from 1, alternates values properly, and allows at most one clockwise turn.
 * To solve this efficiently, we avoid recomputation by memoizing each unique DFS state. Since the sequence is deterministic, we don’t
 * need to store the expected value, just alternate between 2 and 0. By flattening these states into an indexed integer array, we ensure
 * very fast lookups compared to string-based keys. This allows us to explore every possible V-shape while staying efficient enough for
 * large grids.
 *
 */

function lenOfVDiagonal(grid: number[][]): number {
  // All 4 diagonal movement directions
  const directions = [
    [1, 1], // Down-right
    [1, -1], // Down-left
    [-1, -1], // Top-left
    [-1, 1], // Top-right
  ];

  const m = grid.length,
    n = grid[0].length;

  // Each cell has 8 possible states (4 directions × 2 turn states)
  // Flattened index: (x * n + y) * 8 + dir * 2 + turnInt
  const memo: number[] = new Array(m * n * 8).fill(-1);

  // DFS to extend a V-shaped diagonal.
  function dfs(
    cx: number,
    cy: number,
    dir: number,
    turn: boolean,
    target: number
  ): number {
    const nx = cx + directions[dir][0];
    const ny = cy + directions[dir][1];

    // Stop if out of bounds or sequence mismatch
    if (nx < 0 || ny < 0 || nx >= m || ny >= n || grid[nx][ny] !== target) {
      return 0;
    }

    const turnInt = turn ? 1 : 0;
    const index = (nx * n + ny) * 8 + dir * 2 + turnInt;

    // Return cached result if already computed
    if (memo[index] !== -1) {
      return memo[index];
    }

    // Alternate expected sequence: 2 → 0 → 2 → 0 ...
    const nextTarget = 2 - target;

    // Continue in the same diagonal direction
    let maxStep = dfs(nx, ny, dir, turn, nextTarget);

    // If turn is still allowed, try the clockwise turn
    if (turn) {
      const newDir = (dir + 1) % 4;
      maxStep = Math.max(maxStep, dfs(nx, ny, newDir, false, nextTarget));
    }

    // Save result in memo and return
    memo[index] = maxStep + 1;
    return memo[index];
  }

  let res = 0;
  // Iterate over all cells looking for a valid starting point "1"
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        // Try starting in each of 4 diagonal directions
        for (let dir = 0; dir < 4; dir++) {
          // First step must expect a "2" after "1"
          res = Math.max(res, dfs(i, j, dir, true, 2) + 1);
        }
      }
    }
  }

  return res;
}

function main() {
  const grid1 = [
    [2, 2, 1, 2, 2],
    [2, 0, 2, 2, 0],
    [2, 0, 1, 1, 0],
    [1, 0, 2, 2, 2],
    [2, 0, 0, 2, 2],
  ];
  console.log(lenOfVDiagonal(grid1)); // 5

  const grid2 = [
    [2, 2, 2, 2, 2],
    [2, 0, 2, 2, 0],
    [2, 0, 1, 1, 0],
    [1, 0, 2, 2, 2],
    [2, 0, 0, 2, 2],
  ];
  console.log(lenOfVDiagonal(grid2)); // 4

  const grid3 = [
    [1, 2, 2, 2, 2],
    [2, 2, 2, 2, 0],
    [2, 0, 0, 0, 0],
    [0, 0, 2, 2, 2],
    [2, 0, 0, 2, 0],
  ];
  console.log(lenOfVDiagonal(grid3)); // 5

  const grid4 = [[1]];
  console.log(lenOfVDiagonal(grid4)); // 1
}

main();

/**
 *
 * Time complexity is O(n * m)
 * Space complexity is O(n * m)
 *
 */
