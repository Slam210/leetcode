/**
 *
 * We must cut trees in increasing order of height while walking the shortest paths between them.
 * To do this, we first gather and sort all trees by height. Then, for each tree, we compute the
 * shortest path using BFS. If at any point a tree is unreachable, we return -1. Otherwise, we
 * accumulate the BFS distances. This approach ensures we always cut trees in the required order and
 * use the minimum steps possible.
 *
 */

function cutOffTree(forest: number[][]): number {
  const m = forest.length,
    n = forest[0].length;

  // Collect all trees with their height and position
  const trees: [number, number, number][] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (forest[i][j] > 1) {
        trees.push([forest[i][j], i, j]);
      }
    }
  }

  // Sort trees by height (we must cut from smallest to tallest)
  trees.sort((a, b) => a[0] - b[0]);

  // BFS to find shortest path between two points
  function bfs(sr: number, sc: number, tr: number, tc: number): number {
    // If already at target, no steps needed
    if (sr === tr && sc === tc) return 0;

    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const queue: [number, number, number][] = [[sr, sc, 0]];
    visited[sr][sc] = true;

    // Four possible movement directions
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    // Standard BFS loop
    while (queue.length > 0) {
      const [r, c, d] = queue.shift()!;
      for (const [dr, dc] of dirs) {
        const nr = r + dr,
          nc = c + dc;

        // Check valid and unvisited positions
        if (
          nr >= 0 &&
          nr < m &&
          nc >= 0 &&
          nc < n &&
          !visited[nr][nc] &&
          forest[nr][nc] !== 0
        ) {
          // If target reached, return distance
          if (nr === tr && nc === tc) return d + 1;

          visited[nr][nc] = true;
          queue.push([nr, nc, d + 1]);
        }
      }
    }
    // Target unreachable
    return -1;
  }

  // Walk through trees one by one in order
  let totalSteps = 0;
  let [sr, sc] = [0, 0];

  for (const [, tr, tc] of trees) {
    const dist = bfs(sr, sc, tr, tc);

    // If any tree cannot be reached, return -1
    if (dist === -1) return -1;

    totalSteps += dist;
    // Move starting point to current tree
    [sr, sc] = [tr, tc];
  }

  return totalSteps;
}

function main() {
  console.log(
    cutOffTree([
      [1, 2, 3],
      [0, 0, 4],
      [7, 6, 5],
    ])
  );
  console.log(
    cutOffTree([
      [1, 2, 3],
      [0, 0, 0],
      [7, 6, 5],
    ])
  );
  console.log(
    cutOffTree([
      [2, 3, 4],
      [0, 0, 5],
      [8, 7, 6],
    ])
  );
}

main();

/**
 *
 * Time complexity is O(m * n)
 * Space complexity is O(m * n)
 *
 */
