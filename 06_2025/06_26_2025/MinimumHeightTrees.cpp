/**
 *
 * We are given an integer n which represents the amount of nodes along
 * with an array of arrys representing the edges. We are to return the nodes
 * that when used as the root, will generate the minimum heght trees (MHTS).
 * The intuition behind this problem is to use an adjacency list using the edge list.
 * We can find all leaf nodes, removing them from the graph until we reach less than 2,
 * as a graph can have at most 2 centroids.
 *
 */

#include <iostream>
#include <vector>
#include <unordered_set>

using namespace std;

class Solution
{
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>> &edges)
    {
        if (n == 1)
            return {0};

        vector<unordered_set<int>> graph(n);
        for (auto &edge : edges)
        {
            graph[edge[0]].insert(edge[1]);
            graph[edge[1]].insert(edge[0]);
        }

        vector<int> leaves;
        for (int i = 0; i < n; ++i)
        {
            if (graph[i].size() == 1)
            {
                leaves.push_back(i);
            }
        }

        int remainingNodes = n;
        while (remainingNodes > 2)
        {
            remainingNodes -= leaves.size();
            vector<int> newLeaves;
            for (int leaf : leaves)
            {
                int neighbor = *graph[leaf].begin();
                graph[neighbor].erase(leaf);
                if (graph[neighbor].size() == 1)
                {
                    newLeaves.push_back(neighbor);
                }
            }
            leaves = newLeaves;
        }

        return leaves;
    }
};

int main()
{
    Solution sol;
    int n = 6;
    vector<vector<int>> edges = {{0, 3}, {1, 3}, {2, 3}, {4, 3}, {5, 4}};
    vector<int> result = sol.findMinHeightTrees(n, edges);

    cout << "MHT Roots: ";
    for (int r : result)
        cout << r << " ";
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */