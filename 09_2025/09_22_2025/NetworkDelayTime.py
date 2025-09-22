"""

We model the problem as finding shortest paths in a weighted graph. 
Since weights are nonnegative, we apply Dijkstra’s algorithm, repeatedly 
expand the node with the current smallest distance, relax its neighbors, 
and record the shortest times. At the end, if every node has been reached, 
the result is the maximum distance among them; otherwise, it’s impossible 
and we return -1.

"""

import heapq
from typing import List

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        graph = {}
        for u, v, w in times:
            graph.setdefault(u, []).append((v, w))

        dist = {i: 10**9 for i in range(1, n+1)}
        dist[k] = 0

        heap = [(0, k)]

        while heap:
            time, node = heapq.heappop(heap)
            if time > dist[node]:
                continue
            for nei, w in graph.get(node, []):
                if time + w < dist[nei]:
                    dist[nei] = time + w
                    heapq.heappush(heap, (dist[nei], nei))

        max_time = max(dist.values())
        return max_time if max_time < 10**9 else -1


def main():
    sol = Solution()
    tests = [
        ([[2,1,1],[2,3,1],[3,4,1]], 4, 2, 2),
        ([[1,2,1]], 2, 1, 1),                 
        ([[1,2,1]], 2, 2, -1),               
    ]

    for times, n, k, expected in tests:
        result = sol.networkDelayTime(times, n, k)
        print(f"times={times}, n={n}, k={k} -> {result} (expected {expected})")


if __name__ == "__main__":
    main()

"""

Time complexity is O(E) where E is the number of edges
Space complexity is O(E) for the graph, O(N) for dictionary, and O(E) for heap

"""