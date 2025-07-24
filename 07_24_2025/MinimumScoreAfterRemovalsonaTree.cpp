/**
 *
 * This problem asks us to minimize the score obtained by removing two edges from a connected tree,
 * splitting it into three components. The score is defined as the difference between the largest and
 * smallest XOR values of node values in the three resulting components. The core intuition is to use
 * a DFS traversal to precompute the XOR sum of each node's subtree, enabling efficient calculation of
 * XOR values for potential components formed after edge removal. By rooting the tree and recording
 * DFS entry/exit times, we can determine ancestor-descendant relationships between nodes, which allows
 * us to handle overlapping and nested subtrees correctly. We then iterate over all valid pairs of nodes,
 * use the subtree XOR sums to calculate the XOR of each of the three components, and track the minimum
 * possible score from all such pairs.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution
{
public:
    int minimumScore(vector<int> &nums, vector<vector<int>> &edges)
    {
        int n = nums.size();
        vector<vector<int>> graph(n);

        // Build the adjacency list
        for (auto &edge : edges)
        {
            graph[edge[0]].push_back(edge[1]);
            graph[edge[1]].push_back(edge[0]);
        }

        // xorSum[i]: XOR of the subtree rooted at node i
        vector<int> xorSum(n);
        // DFS entry and exit times
        vector<int> in(n), out(n);
        int timer = 0;

        // DFS to compute xorSum and timestamps
        function<void(int, int)> dfs = [&](int node, int parent)
        {
            in[node] = ++timer;
            xorSum[node] = nums[node];
            for (int neighbor : graph[node])
            {
                if (neighbor == parent)
                    continue;
                dfs(neighbor, node);
                xorSum[node] ^= xorSum[neighbor];
            }
            out[node] = ++timer;
        };

        // Root the DFS at node 0
        dfs(0, -1);

        // Helper to check if u is ancestor of v
        auto isAncestor = [&](int u, int v)
        {
            return in[u] < in[v] && out[v] < out[u];
        };

        // XOR of the entire tree
        int totalXOR = xorSum[0];
        int result = INT_MAX;

        // Try all pairs of nodes to simulate edge removals
        for (int i = 0; i < n; ++i)
        {
            for (int j = i + 1; j < n; ++j)
            {
                if (i == 0 || j == 0)
                    // Can't remove edge connected to the root
                    continue;

                int a = xorSum[i], b = xorSum[j], c;

                // i is ancestor of j
                if (isAncestor(i, j))
                {
                    c = totalXOR ^ a;
                    a = xorSum[j];
                    b = xorSum[i] ^ xorSum[j];
                }
                // j is ancestor of i
                else if (isAncestor(j, i))
                {
                    c = totalXOR ^ b;
                    b = xorSum[i];
                    a = xorSum[j] ^ xorSum[i];
                }
                // i and j are disjoint
                else
                {
                    c = totalXOR ^ a ^ b;
                }

                // Compute score
                int maxX = max({a, b, c});
                int minX = min({a, b, c});
                result = min(result, maxX - minX);
            }
        }

        return result;
    }
};

int main()
{
    Solution sol;
    vector<int> nums = {5, 5, 2, 4, 4, 2};
    vector<vector<int>> edges = {{0, 1}, {1, 2}, {5, 2}, {4, 3}, {1, 3}};
    cout << "Minimum score: " << sol.minimumScore(nums, edges) << endl;
    return 0;
}

/**
 *
 * Time complexity is O(n^2) for checking all pairs of nodes and O(n) for DFS
 * Space complexity is O(n) for xorSum, in, out and adjacency list
 *
 */