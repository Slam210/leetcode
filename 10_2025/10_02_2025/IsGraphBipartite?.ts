/**
 *
 * We want to check if we can divide the graph into two sets such that all edges connect across sets.
 * To do this, we can attempt to 2-color the graph with color one node red, all its neighbors blue,
 * their neighbors red, and so on. If at any point two adjacent nodes get the same color, the graph
 * cannot be bipartite. Since the graph might be disconnected, we repeat this process for every unvisited node.
 * If all components can be consistently 2-colored, the graph is bipartite.
 *
 */

export default function isBipartite(graph: number[][]): boolean {
  const n = graph.length;
  const colors = new Array(n).fill(-1);

  for (let i = 0; i < n; i++) {
    if (colors[i] !== -1) continue;

    const queue: number[] = [i];
    colors[i] = 0;

    while (queue.length > 0) {
      const u = queue.shift()!;
      for (const v of graph[u]) {
        if (colors[v] === -1) {
          colors[v] = 1 - colors[u];
          queue.push(v);
        } else if (colors[v] === colors[u]) {
          return false;
        }
      }
    }
  }

  return true;
}

function main(): void {
  const cases: number[][][] = [
    [
      [1, 2, 3],
      [0, 2],
      [0, 1, 3],
      [0, 2],
    ],
    [
      [1, 3],
      [0, 2],
      [1, 3],
      [0, 2],
    ],
    [[], []],
    [[1], [0, 3], [3], [1, 2]],
  ];

  for (const g of cases) {
    console.log("Graph:", g);
    console.log("Is bipartite?", isBipartite(g));
    console.log("---");
  }
}

main();

/**
 *
 * Time complexity is O(V + E)
 * Space complexity is O(V)
 *
 */
