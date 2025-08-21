/**
 *
 * We are given an m x n binary matrix mat, and we need to count how many submatrices are filled with only 1s.
 * We can use dynamic programming to build up information about consecutive ones in each column and use that to
 * efficiently count valid submatrices. The trick is that we treat each row as a "base." For every row, compute
 * how many consecutive 1s upwards exist for each column. Then, for each row, use these "heights" to count how
 * many submatrices end at that row by extending leftwards.
 *
 */

function numSubmat(mat: number[][]): number {
  const m = mat.length;
  const n = mat[0].length;
  const heights = new Array(n).fill(0);
  let total = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1) {
        heights[j] += 1;
      } else {
        heights[j] = 0;
      }
    }

    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1) {
        let minHeight = heights[j];
        for (let k = j; k >= 0 && minHeight > 0; k--) {
          minHeight = Math.min(minHeight, heights[k]);
          total += minHeight;
        }
      }
    }
  }

  return total;
}

function main() {
  const mat1 = [
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 0],
  ];

  const mat2 = [
    [1, 1, 1],
    [1, 1, 1],
  ];

  console.log("Result 1:", numSubmat(mat1));
  console.log("Result 2:", numSubmat(mat2));
}

main();

/**
 *
 * Time complexity is O(m * n^2)
 * Space complexity is O(n)
 *
 */
