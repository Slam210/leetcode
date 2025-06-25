/**
 *
 * Given an m x n array and told to generate two functions.
 * Constructor which makes the array into a board.
 * sumRegion which takes row1, col1, row2, col2 and sums the region inbetween. Similar
 * to Range Sum Query, we can use prefix sum matrixes to compute the sum in O(1) time
 *
 */

class NumMatrix {
  private prefix: number[][];

  constructor(matrix: number[][]) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    this.prefix = Array.from({ length: rows + 1 }, () =>
      new Array(cols + 1).fill(0)
    );

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= cols; j++) {
        this.prefix[i][j] =
          matrix[i - 1][j - 1] +
          this.prefix[i - 1][j] +
          this.prefix[i][j - 1] -
          this.prefix[i - 1][j - 1];
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    return (
      this.prefix[row2 + 1][col2 + 1] -
      this.prefix[row1][col2 + 1] -
      this.prefix[row2 + 1][col1] +
      this.prefix[row1][col1]
    );
  }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */

const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
];

const obj = new NumMatrix(matrix);
console.log(obj.sumRegion(2, 1, 4, 3));
