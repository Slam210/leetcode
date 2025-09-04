/**
 *
 * We want to remove exactly one edge to restore the tree structure. A tree cannot have cycles, so the added
 * edge is the one that closes a cycle. By applying Union-Find, we can check for cycles as we add edges. Each
 * time we attempt to connect two nodes, if they’re already connected, then that edge forms a cycle. Processing
 * in order ensures that if multiple redundant edges exist, we return the last one.
 *
 */

class UnionFind {
  parent: number[];
  rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size + 1 }, (_, i) => i);
    this.rank = new Array(size + 1).fill(0);
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

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

function findRedundantConnection(edges: number[][]): number[] {
  const n = edges.length;
  const uf = new UnionFind(n);
  let redundant: number[] = [];

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) {
      redundant = [u, v];
    }
  }

  return redundant;
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
    [1, 4],
    [1, 5],
  ];

  console.log("Result 1:", findRedundantConnection(edges1));
  console.log("Result 2:", findRedundantConnection(edges2));
}

main();

export { findRedundantConnection };

/**
 *
 * Run time is O(n)
 * Space time is O(n)
 *
 */
