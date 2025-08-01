/**
 *
 * We are given an array of intervals such that each interval is of the form [start, end].
 * Our task is to remove the minimum number of intervals so that the remaining intervals are
 * non-overlapping. To minimize the number of intervals removed we want to keep as many
 * non-overlapping intervals as possible. So we can sort the intervals by their end time, and
 * always pick the earliest finishing interval that doesn't overlap with the last one we kept.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution
{
public:
    int eraseOverlapIntervals(vector<vector<int>> &intervals)
    {
        if (intervals.empty())
            return 0;

        sort(intervals.begin(), intervals.end(), [](const vector<int> &a, const vector<int> &b)
             { return a[1] < b[1]; });

        int count = 0;
        int prevEnd = INT_MIN;

        for (const auto &interval : intervals)
        {
            if (interval[0] >= prevEnd)
            {
                count++;
                prevEnd = interval[1];
            }
        }

        return intervals.size() - count;
    }
};

int main()
{
    Solution sol;

    vector<vector<int>> intervals1 = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
    cout << "Example 1 Output: " << sol.eraseOverlapIntervals(intervals1) << endl;

    vector<vector<int>> intervals2 = {{1, 2}, {1, 2}, {1, 2}};
    cout << "Example 2 Output: " << sol.eraseOverlapIntervals(intervals2) << endl;

    vector<vector<int>> intervals3 = {{1, 2}, {2, 3}};
    cout << "Example 3 Output: " << sol.eraseOverlapIntervals(intervals3) << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(1)
 *
 */