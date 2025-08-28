/**
 *
 * We are tasked with sorting the diagonals of a square matrix in two different ways.The diagonals in the bottom-left
 * should be sorted in descending order, while those in the top-right should be sorted in ascending order. To achieve this,
 * we can treat each diagonal as an independent sequence. By iterating over diagonal starting points, extracting values,
 * sorting them in the correct direction, and reinserting them, we transform the matrix as required.
 *
 */

function getDiagonal(grid: number[][], row: number, col: number): number[] {
  const n = grid.length;
  const diagonal: number[] = [];
  while (row < n && col < n) {
    diagonal.push(grid[row][col]);
    row++;
    col++;
  }
  return diagonal;
}

function setDiagonal(
  grid: number[][],
  row: number,
  col: number,
  diagonal: number[]
): void {
  const n = grid.length;
  let idx = 0;
  while (row < n && col < n) {
    grid[row][col] = diagonal[idx++];
    row++;
    col++;
  }
}

function sortMatrix(grid: number[][]): number[][] {
  const n = grid.length;

  for (let row = 0; row < n; row++) {
    let diagonal = getDiagonal(grid, row, 0);
    diagonal.sort((a, b) => b - a);
    setDiagonal(grid, row, 0, diagonal);
  }

  for (let col = 1; col < n; col++) {
    let diagonal = getDiagonal(grid, 0, col);
    diagonal.sort((a, b) => a - b);
    setDiagonal(grid, 0, col, diagonal);
  }

  return grid;
}

function main() {
  const grid = [
    [4, 3, 2],
    [7, 6, 1],
    [9, 8, 5],
  ];

  console.log("Original matrix:");
  console.log(grid.map((row) => row.join(" ")).join("\n"));

  const sorted = sortMatrix(grid);

  console.log("\nSorted matrix:");
  console.log(sorted.map((row) => row.join(" ")).join("\n"));
}

main();

/**
 *
 * Time complexity is O(n^2 log(n))
 * Space complexity is O(n)
 *
 */
