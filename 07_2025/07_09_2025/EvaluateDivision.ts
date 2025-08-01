/**
 * 
 * Given a list of equations like a / b = 2.0  and a list of queries like a / c = ?,
 * we are to return a list of answers, one for each query such that if the result is known, 
 * return the computed float. If not computable, return -1.0. This is a classic graph traversal 
 * problem. Each variable is a node. Each equation a / b = 2.0 adds an edge from a → b with weight 
 * 2.0 and an edge from b → a with weight 1 / 2.0. To solve a query a / c, we can do a DFS or BFS 
 * from a to c, multiply edge weights along the path, and return the product if path exists, 
 * otherwise -1.0.
 * 
 */

function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  const graph: Map<string, Map<string, number>> = new Map();

  // Build the graph
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const value = values[i];

    if (!graph.has(a)) graph.set(a, new Map());
    if (!graph.has(b)) graph.set(b, new Map());

    graph.get(a)!.set(b, value);
    graph.get(b)!.set(a, 1 / value);
  }

  // DFS to compute result
  function dfs(
    current: string,
    target: string,
    visited: Set<string>,
    acc: number
  ): number {
    if (!graph.has(current)) return -1.0;
    if (current === target) return acc;

    visited.add(current);

    for (const [neighbor, weight] of graph.get(current)!) {
      if (!visited.has(neighbor)) {
        const result = dfs(neighbor, target, visited, acc * weight);
        if (result !== -1.0) return result;
      }
    }

    return -1.0;
  }

  // Process queries
  const results: number[] = [];

  for (const [a, b] of queries) {
    if (!graph.has(a) || !graph.has(b)) {
      results.push(-1.0);
    } else if (a === b) {
      results.push(1.0);
    } else {
      results.push(dfs(a, b, new Set(), 1.0));
    }
  }

  return results;
}
  

/**
 * 
 * Time complexity is O(E + N) for graph construction and queries
 * Space complexity is O(E + N) for graph and visits per query.
 * 
 */