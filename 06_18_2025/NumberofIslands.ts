/*

The intuition behind this problem is to utilize a connected component aspect of it.
We can use a function such as dfs to mark each part of an island when we encounter a i.
From there, we mark the island, and increment count.

*/

function numIslands(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  function dfs(i: number, j: number): void {
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== "1") return;
    grid[i][j] = "0";
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        dfs(i, j);
        count++;
      }
    }
  }

  return count;
}

const grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];
console.log(numIslands(grid));

/*

Time complexity is O(n * m) as we have to visit each node
Space complexity is O(m * n) as that is our recursion stack depth in DFS

*/
