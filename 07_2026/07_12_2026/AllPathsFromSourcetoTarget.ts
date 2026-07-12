/*
 * @lc app=leetcode id=796 lang=typescript
 *
 * [796] All Paths From Source to Target
 */
// @lc code=start
function allPathsSourceTarget(graph: number[][]): number[][] {
  const result: number[][] = [];
  const target = graph.length - 1;

  function dfs(node: number, path: number[]): void {
    if (node === target) {
      result.push(path);
      return;
    }
    for (const neighbor of graph[node]) {
      dfs(neighbor, [...path, neighbor]);
    }
  }

  dfs(0, [0]);

  return result;
}
// @lc code=end
