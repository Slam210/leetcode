/**
 *
 * We need to find the minimum flight cost from a source to a destination while limiting the number of stops.
 * Since every stop adds an edge, the problem becomes finding the cheapest path with at most k+1 edges.
 * This matches the Bellman-Ford algorithm, which computes shortest paths by progressively relaxing edges.
 * By running Bellman-Ford for k+1 iterations and always working on a copy of the previous distances, we
 * ensure we never exceed the stop limit. The final cost to the destination is the answer if reachable otherwise, return -1.
 *
 */

export default function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number
): number {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  for (let t = 0; t <= k; t++) {
    const temp = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < temp[v]) {
        temp[v] = dist[u] + w;
      }
    }
    dist = temp;
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}

function main(): void {
  const n = 4;
  const flights = [
    [0, 1, 100],
    [1, 2, 100],
    [2, 3, 100],
    [0, 2, 500],
  ];
  const src = 0,
    dst = 3,
    k = 1;

  console.log("Cheapest Price:", findCheapestPrice(n, flights, src, dst, k));
}

main();

/**
 *
 * Time complexity is O((k + 1) * E)
 * Space complexity is O(n)
 *
 */
