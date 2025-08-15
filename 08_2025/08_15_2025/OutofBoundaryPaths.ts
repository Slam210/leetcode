/**
 *
 * We want to count the ways the ball can exit the grid within a limited number of moves. Each position and move
 * count combination can lead to repeated calculations if approached naively, so we use dynamic programming with
 * memoization. We define a 3D state (row, col, movesLeft) that stores the number of ways to exit from that point.
 * If the ball goes out of bounds, that’s a successful path (count = 1). If there are no moves left, we stop.
 * By exploring all four directions recursively and caching results, we can efficiently count all possible escape
 * paths modulo 10^9 + 7.
 *
 */

function findPaths(
  m: number,
  n: number,
  maxMove: number,
  startRow: number,
  startColumn: number
): number {
  const MOD = 1_000_000_007;
  const dp: number[][][] = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => Array(maxMove + 1).fill(-1))
  );

  function dfs(row: number, col: number, movesLeft: number): number {
    if (row < 0 || row >= m || col < 0 || col >= n) return 1;
    if (movesLeft === 0) return 0;
    if (dp[row][col][movesLeft] !== -1) return dp[row][col][movesLeft];

    let paths = 0;
    paths = (paths + dfs(row - 1, col, movesLeft - 1)) % MOD;
    paths = (paths + dfs(row + 1, col, movesLeft - 1)) % MOD;
    paths = (paths + dfs(row, col - 1, movesLeft - 1)) % MOD;
    paths = (paths + dfs(row, col + 1, movesLeft - 1)) % MOD;

    dp[row][col][movesLeft] = paths;
    return paths;
  }

  return dfs(startRow, startColumn, maxMove);
}

function main() {
  console.log(findPaths(2, 2, 2, 0, 0));
  console.log(findPaths(1, 3, 3, 0, 1));
}

main();

/**
 *
 * Time complexity is O(m * n * maxMove)
 * Space complexity is O(m * n * maxMove)
 *
 */
