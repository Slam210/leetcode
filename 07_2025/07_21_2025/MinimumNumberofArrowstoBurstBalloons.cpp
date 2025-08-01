/**
 *
 * We are given a list of intervals ([xstart, xend]) representing balloons on the x-axis. An arrow
 * is shot vertically at some x, and it bursts all balloons that intersect xstart <= x <= xend. We
 * are to return the minimum number of arrows required to burst all balloons. If balloons overlap,
 * we can burst them with one arrow. So we want to group overlapping intervals and use one arrow per
 * group. Sort intervals by their end (xend) to maximize how many upcoming balloons can be burst with
 * the current arrow.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution
{
public:
    int findMinArrowShots(vector<vector<int>> &points)
    {
        if (points.empty())
            return 0;

        sort(points.begin(), points.end(), [](const vector<int> &a, const vector<int> &b)
             { return a[1] < b[1]; });

        int arrows = 1;
        int arrowPos = points[0][1];

        for (int i = 1; i < points.size(); ++i)
        {
            if (points[i][0] > arrowPos)
            {
                arrows++;
                arrowPos = points[i][1];
            }
        }

        return arrows;
    }
};

int main()
{
    Solution solution;

    vector<vector<int>> balloons1 = {{10, 16}, {2, 8}, {1, 6}, {7, 12}};
    vector<vector<int>> balloons2 = {{1, 2}, {3, 4}, {5, 6}, {7, 8}};
    vector<vector<int>> balloons3 = {{1, 2}, {2, 3}, {3, 4}, {4, 5}};

    cout << "Minimum arrows needed (test 1): " << solution.findMinArrowShots(balloons1) << endl;
    cout << "Minimum arrows needed (test 2): " << solution.findMinArrowShots(balloons2) << endl;
    cout << "Minimum arrows needed (test 3): " << solution.findMinArrowShots(balloons3) << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n log(n)) since we use sorting
 * Space complexity is O(1)
 *
 */
