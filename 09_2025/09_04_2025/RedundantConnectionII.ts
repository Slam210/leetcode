/**
 *
 * We want to restore a valid rooted tree by removing one extra directed edge. A rooted tree requires exactly one parent per node and no cycles.
 * If a node ends up with two parents, we record both incoming edges. Then, we use Union-Find to check for cycles. If a cycle exists without
 * two parents, the last edge that closes the cycle is the answer. If a cycle exists with two parents, we must remove the first incoming edge
 * of the node with two parents. Otherwise, if there’s no cycle but only two parents, we remove the second incoming edge.
 *
 */

class UnionFind {
  parent: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size + 1 }, (_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX === rootY) return false;
    this.parent[rootY] = rootX;
    return true;
  }
}

function findRedundantDirectedConnection(edges: number[][]): number[] {
  const n = edges.length;
  const parent: number[] = new Array(n + 1).fill(0);
  let cand1: number[] | null = null;
  let cand2: number[] | null = null;

  // Check for two parents
  for (const [u, v] of edges) {
    if (parent[v] === 0) {
      parent[v] = u;
    } else {
      // first parent edge
      cand1 = [parent[v], v];
      // second parent edge
      cand2 = [u, v];
      break;
    }
  }

  // Union-Find check for cycle
  const uf = new UnionFind(n);
  for (const [u, v] of edges) {
    if (cand2 && u === cand2[0] && v === cand2[1]) {
      // skip cand2 temporarily
      continue;
    }
    if (!uf.union(u, v)) {
      // Cycle found
      if (cand1) return cand1; // if two parents exist, remove cand1
      return [u, v]; // otherwise remove this edge
    }
  }

  return cand2!;
}

function main(): void {
  const edges1 = [
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  const edges2 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
    [1, 5],
  ];

  console.log("Result 1:", findRedundantDirectedConnection(edges1));
  console.log("Result 2:", findRedundantDirectedConnection(edges2));
}

main();

export { findRedundantDirectedConnection };
