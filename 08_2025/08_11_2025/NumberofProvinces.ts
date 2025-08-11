/**
 *
 * We have an n x n adjacency matrix isConnected representing direct city connections. Cities are part of
 * the same province if they are connected directly or indirectly. We need to count the total number of
 * such connected components. This is a connected components in an undirected graph problem. We can solve
 * it using DFS.
 *
 */

function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const visited: boolean[] = Array(n).fill(false);
  let count = 0;

  function dfs(
    city: number,
    visited: boolean[],
    isConnected: number[][]
  ): void {
    visited[city] = true;
    for (let neighbor = 0; neighbor < isConnected.length; neighbor++) {
      if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
        dfs(neighbor, visited, isConnected);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count++;
      dfs(i, visited, isConnected);
    }
  }

  return count;
}

function main(): void {
  const isConnected1 = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ];

  const isConnected2 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  const isConnected3 = [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ];

  console.log(findCircleNum(isConnected1));
  console.log(findCircleNum(isConnected2));
  console.log(findCircleNum(isConnected3));
}

main();
