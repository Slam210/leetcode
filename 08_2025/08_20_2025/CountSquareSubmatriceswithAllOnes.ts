/**
 *
 * We want to count all square submatrices consisting entirely of ones in a given binary matrix.
 * To solve this, we recognize that the existence of a larger square depends on smaller squares.
 * Specifically, a square ending at any position (i, j) is only possible if that cell is 1 and if
 * we can extend the smaller squares formed at its top, left, and top-left neighbors. By using
 * dynamic programming, we store the largest square size possible at each cell and accumulate
 * these values to count all possible squares in the matrix.
 *
 */

function countSquares(matrix: number[][]): number {
  let m = matrix.length;
  let n = matrix[0].length;
  let dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  let count = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
        count += dp[i][j];
      }
    }
  }

  return count;
}

function main() {
  let matrix: number[][] = [
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 1, 1, 1],
  ];
  console.log(countSquares(matrix));
}

main();

/**
 *
 * Time complexity is O(m * n)
 * Space complexity is O(m * n)
 *
 */
