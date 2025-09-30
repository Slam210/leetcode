/**
 *
 * We want to swim from the top-left to bottom-right in a grid with rising water.
 * The minimum time corresponds to the minimum elevation along the path’s highest cell.
 * By using a min-heap, we can always explore the next cell with the smallest elevation,
 * tracking the maximum elevation along the path. Once we reach the target, the current
 * maximum elevation is the minimum time needed.
 *
 */

export default function swimInWater(grid: number[][]): number {
  const n = grid.length;
  // Track visited cells to avoid revisiting
  const visited: boolean[][] = Array.from({ length: n }, () =>
    Array(n).fill(false)
  );

  // Min-heap storing [elevation, row, col], start at top-left
  const heap: [number, number, number][] = [[grid[0][0], 0, 0]];
  visited[0][0] = true;

  // 4-directional moves
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // Track the maximum elevation along the current path
  let maxElevation = 0;

  // Explore cells in order of increasing elevation
  while (heap.length) {
    // Pop the cell with the smallest elevation (simulate min-heap)
    heap.sort((a, b) => a[0] - b[0]);
    const [elev, r, c] = heap.shift()!;
    maxElevation = Math.max(maxElevation, elev);

    // Check if we reached the bottom-right cell
    if (r === n - 1 && c === n - 1) return maxElevation;

    // Push all unvisited neighbors into the heap
    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
        visited[nr][nc] = true;
        heap.push([grid[nr][nc], nr, nc]);
      }
    }
  }

  return -1;
}

function main() {
  const grid1 = [
    [0, 2],
    [1, 3],
  ];
  const grid2 = [
    [0, 1, 2, 3, 4],
    [24, 23, 22, 21, 5],
    [12, 13, 14, 15, 16],
    [11, 17, 18, 19, 20],
    [10, 9, 8, 7, 6],
  ];
  console.log(swimInWater(grid1));
  console.log(swimInWater(grid2));
}

main();

/**
 *
 * Time complexity is O(n^2log(n))
 * Space complexity is O(n^2)
 *
 */
