/*

The idea behind this is to use something like Kahn's algotithm for
a BFS style approach. We must order the courses such that prerequisite
constraints are satisfied. This is the definition of a topological sort.
If the graph has a cycle, it’s impossible to complete all coursess.

*/

#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Solution
{
public:
    vector<int> findOrder(int numCourses, vector<vector<int>> &prerequisites)
    {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);

        for (const auto &pair : prerequisites)
        {
            int course = pair[0];
            int prereq = pair[1];
            adj[prereq].push_back(course);
            inDegree[course]++;
        }

        queue<int> q;
        for (int i = 0; i < numCourses; ++i)
        {
            if (inDegree[i] == 0)
            {
                q.push(i);
            }
        }

        vector<int> order;
        while (!q.empty())
        {
            int current = q.front();
            q.pop();
            order.push_back(current);

            for (int neighbor : adj[current])
            {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0)
                {
                    q.push(neighbor);
                }
            }
        }

        if (order.size() == numCourses)
        {
            return order;
        }

        return {};
    }
};

int main()
{
    Solution solution;

    int numCourses = 4;
    vector<vector<int>> prerequisites = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};

    vector<int> order = solution.findOrder(numCourses, prerequisites);

    if (order.empty())
    {
        cout << "It is impossible to finish all courses." << endl;
    }
    else
    {
        cout << "Course order: ";
        for (int course : order)
        {
            cout << course << " ";
        }
        cout << endl;
    }

    return 0;
}

/*

Time complexity is O(V + E) as we need to visit each edge and nde in the BFS
Space complexity is O(V + E) for adjacency list and in-degree array

*/
