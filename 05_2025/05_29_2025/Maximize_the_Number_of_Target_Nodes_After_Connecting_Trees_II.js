/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2) {
  // Helper DFS function to color nodes and count even-depth nodes
  function dfs(node, parent, depth, adjList, color) {
    // If node is at even depth, count as 1
    let countEven = 1 - (depth % 2);
    color[node] = depth % 2; // 0 for even, 1 for odd
    for (let neighbor of adjList[node]) {
      if (neighbor === parent) continue;
      countEven += dfs(neighbor, node, depth + 1, adjList, color);
    }
    return countEven;
  }

  // Builds adjacency list and returns [evenCount, oddCount] for a tree
  function buildTree(edges, color) {
    const n = edges.length + 1;
    const adjList = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
      adjList[u].push(v);
      adjList[v].push(u);
    }
    const evenCount = dfs(0, -1, 0, adjList, color);
    return [evenCount, n - evenCount]; // [even nodes, odd nodes]
  }

  const n = edges1.length + 1;
  const m = edges2.length + 1;

  const color1 = new Array(n).fill(0);
  const color2 = new Array(m).fill(0);

  const count1 = buildTree(edges1, color1); // color1[i] = 0 or 1
  const count2 = buildTree(edges2, color2); // [evenCount, oddCount]

  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    // Nodes in Tree 1 that are target to node i are those with the same parity
    // Maximize the result by choosing the parity in Tree 2 with more nodes
    result[i] = count1[color1[i]] + Math.max(count2[0], count2[1]);
  }

  return result;
};

const edges1 = [
  [0, 1],
  [0, 2],
  [2, 3],
  [2, 4],
];

const edges2 = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 7],
  [1, 4],
  [4, 5],
  [4, 6],
];

console.log(maxTargetNodes(edges1, edges2));
