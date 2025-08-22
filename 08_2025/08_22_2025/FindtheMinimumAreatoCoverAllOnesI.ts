/**
 *
 * When approaching this problem, we recognize that the smallest rectangle containing all 1s must be bounded by the
 * outermost positions where 1s appear. By scanning through the grid, we can track the minimum and maximum rows and
 * columns that contain at least one 1. This ensures that we cover all possible 1s without leaving empty space outside.
 * Once the boundaries are identified, calculating the area is straightforward: it is simply the product of the
 * rectangle’s width and height.
 *
 */

function minimumArea(grid: number[][]): number {
  let rowMin = Infinity,
    rowMax = -Infinity;
  let colMin = Infinity,
    colMax = -Infinity;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 1) {
        rowMin = Math.min(rowMin, r);
        rowMax = Math.max(rowMax, r);
        colMin = Math.min(colMin, c);
        colMax = Math.max(colMax, c);
      }
    }
  }

  if (rowMin === Infinity) return 0;

  const height = rowMax - rowMin + 1;
  const width = colMax - colMin + 1;
  return height * width;
}

function main() {
  const grid1 = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ];
  console.log("Minimum area:", minimumArea(grid1));

  const grid2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  console.log("Minimum area:", minimumArea(grid2));

  const grid3 = [
    [1, 0],
    [0, 0],
  ];
  console.log("Minimum area:", minimumArea(grid3));
}

main();

/**
 *
 * Time complexity is O(n * m)
 * Space complexity is O(1)
 *
 */
