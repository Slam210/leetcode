/*

Each building gives us two critical events.
A start of a building at left with a given height.
An end of a building at right.
We "sweep" a vertical line from left to right across all building edges.
We Add building height when we reach the left edge.
We Remove building height when we reach the right edge.
At each event point, we check the maximum height in the current active buildings.
If it changes, we add a new key point to the result.

*/

#include <iostream>
#include <vector>
#include <queue>
#include <set>
#include <algorithm>

using namespace std;

class Solution
{
public:
    vector<vector<int>> getSkyline(vector<vector<int>> &buildings)
    {
        vector<pair<int, int>> events;

        // Convert buildings into events
        for (auto &b : buildings)
        {
            // Start of building: use -height to prioritize in sorting
            events.emplace_back(b[0], -b[2]);
            // End of building
            events.emplace_back(b[1], b[2]);
        }

        sort(events.begin(), events.end());

        multiset<int> heights = {0};
        int prevMaxHeight = 0;
        vector<vector<int>> result;

        for (auto &[x, h] : events)
        {
            if (h < 0)
            {
                heights.insert(-h);
            }
            else
            {
                heights.erase(heights.find(h));
            }

            int currMaxHeight = *heights.rbegin();

            if (currMaxHeight != prevMaxHeight)
            {
                result.push_back({x, currMaxHeight});
                prevMaxHeight = currMaxHeight;
            }
        }

        return result;
    }
};

int main()
{
    Solution sol;
    vector<vector<int>> buildings = {
        {2, 9, 10},
        {3, 7, 15},
        {5, 12, 12},
        {15, 20, 10},
        {19, 24, 8}};

    vector<vector<int>> skyline = sol.getSkyline(buildings);
    for (auto &point : skyline)
    {
        cout << "[" << point[0] << ", " << point[1] << "] ";
    }
    cout << endl;

    return 0;
}

/*

Run time is O(n log(n)) since we have to perform sorts
Space complexity is O(n)

*/