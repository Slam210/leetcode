/**
 *
 * We systematically scan the grid, and whenever we encounter unvisited land, we explore the entire island it belongs to using DFS or BFS, counting its size.
 * By marking visited cells during exploration, we ensure we don’t recount the same land twice. Each exploration yields an island area, and by comparing them,
 * we determine the maximum island area. If no land exists, the result is zero.
 *
 */

export default function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  let maxArea = 0;

  function dfs(
    grid: number[][],
    visited: boolean[][],
    i: number,
    j: number
  ): number {
    const m = grid.length;
    const n = grid[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n) return 0;
    if (visited[i][j] || grid[i][j] === 0) return 0;

    visited[i][j] = true;
    let area = 1;
    area += dfs(grid, visited, i + 1, j);
    area += dfs(grid, visited, i - 1, j);
    area += dfs(grid, visited, i, j + 1);
    area += dfs(grid, visited, i, j - 1);

    return area;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        const area = dfs(grid, visited, i, j);
        maxArea = Math.max(maxArea, area);
      }
    }
  }
  return maxArea;
}

function main(): void {
  const cases = [
    {
      grid: [
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      ],
      expected: 6,
    },
    {
      grid: [[0, 0, 0, 0, 0, 0, 0, 0]],
      expected: 0,
    },
    {
      grid: [[1, 1, 0, 1]],
      expected: 2,
    },
  ];

  for (const [i, c] of cases.entries()) {
    const result = maxAreaOfIsland(c.grid);
    console.log(`Case ${i + 1}: result=${result}, expected=${c.expected}`);
  }
}

main();

/**
 *
 * Time complexity is O(m * n)
 * Space complexity is O(m * n)
 *
 */
