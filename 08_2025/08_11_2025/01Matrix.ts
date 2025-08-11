/**
 *
 * We’re given a binary matrix mat with 0s and 1s. For each cell, we must find the minimum Manhattan
 * distance to a cell containing 0. The distance is measured by moving up/down/left/right. This is a
 * multi-source BFS problem as all 0 cells are starting points. We push all these into a queue initially.
 * BFS spreads outwards level-by-level, updating the distance for each 1 cell the first time it’s visited,
 * which ensures the shortest distance to any 0.
 *
 */

type Cell = [number, number];
const dirs: Cell[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function updateMatrix(mat: number[][]): any {
  const m = mat.length;
  const n = mat[0].length;
  const dist: number[][] = Array.from({ length: m }, () =>
    Array(n).fill(Infinity)
  );
  const queue: Cell[] = [];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        if (dist[nr][nc] > dist[r][c] + 1) {
          dist[nr][nc] = dist[r][c] + 1;
          queue.push([nr, nc]);
        }
      }
    }
  }

  return dist;
}

function main(): void {
  const mat1 = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ];
  const mat2 = [
    [0, 1, 1],
    [1, 1, 1],
    [1, 0, 1],
  ];

  console.log("Example 1:", updateMatrix(mat1));
  console.log("Example 2:", updateMatrix(mat2));
}

main();

/**
 *
 * Time complexity is O(m * n)
 * Space complexity is O(m * n)
 *
 */
