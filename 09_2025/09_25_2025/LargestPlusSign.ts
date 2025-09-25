/**
 *
 * We approach this by turning the grid into a DP map of arm lengths. For each direction, we
 * compute how many consecutive 1s stretch from that direction to the cell. Then, at each cell,
 * the potential order of a plus sign is determined by the minimum of these four arm lengths.
 * Finally, we scan through all cells to track the maximum possible order, which becomes our answer.
 *
 */

function orderOfLargestPlusSign(n: number, mines: number[][]): number {
  let grid = Array.from({ length: n }, () => Array(n).fill(1));
  for (let [x, y] of mines) grid[x][y] = 0;

  let dp = Array.from({ length: n }, () => Array(n).fill(n));

  for (let r = 0; r < n; r++) {
    let count = 0;
    for (let c = 0; c < n; c++) {
      count = grid[r][c] === 1 ? count + 1 : 0;
      dp[r][c] = Math.min(dp[r][c], count);
    }
    count = 0;
    for (let c = n - 1; c >= 0; c--) {
      count = grid[r][c] === 1 ? count + 1 : 0;
      dp[r][c] = Math.min(dp[r][c], count);
    }
  }

  for (let c = 0; c < n; c++) {
    let count = 0;
    for (let r = 0; r < n; r++) {
      count = grid[r][c] === 1 ? count + 1 : 0;
      dp[r][c] = Math.min(dp[r][c], count);
    }
    count = 0;
    for (let r = n - 1; r >= 0; r--) {
      count = grid[r][c] === 1 ? count + 1 : 0;
      dp[r][c] = Math.min(dp[r][c], count);
    }
  }

  let result = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      result = Math.max(result, dp[r][c]);
    }
  }

  return result;
}

function main() {
  console.log(orderOfLargestPlusSign(5, [[4, 2]]));
  console.log(orderOfLargestPlusSign(1, [[0, 0]]));
  console.log(orderOfLargestPlusSign(2, []));
}

main();
