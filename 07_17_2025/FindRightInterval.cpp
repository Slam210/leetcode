/**
 *
 * We are given an array intervals, where intervals[i] = [starti, endi], and each starti is unique.
 * We need to find, for each interval i, the index j of the interval such that: startj >= endi, and
 * startj is the smallest possible.  If no such interval exists, return -1 at that position. This is
 * a search problem, where for each endi, you want to quickly find the smallest startj ≥ endi. Since
 * start points are unique we store all intervals' start values and their original indices in a list.
 * Sort that list by start value. For each interval we use binary search to find the smallest startj ≥
 * endi in the sorted list.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution
{
public:
    vector<int> findRightInterval(vector<vector<int>> &intervals)
    {
        int n = intervals.size();
        vector<pair<int, int>> starts;

        for (int i = 0; i < n; ++i)
        {
            starts.emplace_back(intervals[i][0], i);
        }

        sort(starts.begin(), starts.end());

        vector<int> result;

        for (const auto &interval : intervals)
        {
            int target = interval[1];
            int left = 0, right = n - 1;
            int foundIndex = -1;

            while (left <= right)
            {
                int mid = (left + right) / 2;
                if (starts[mid].first >= target)
                {
                    foundIndex = starts[mid].second;
                    right = mid - 1;
                }
                else
                {
                    left = mid + 1;
                }
            }

            result.push_back(foundIndex);
        }

        return result;
    }
};

int main()
{
    Solution sol;

    vector<vector<int>> intervals1 = {{1, 2}};
    vector<int> res1 = sol.findRightInterval(intervals1);
    for (int r : res1)
        cout << r << " ";
    cout << endl;

    vector<vector<int>> intervals2 = {{3, 4}, {2, 3}, {1, 2}};
    vector<int> res2 = sol.findRightInterval(intervals2);
    for (int r : res2)
        cout << r << " ";
    cout << endl;

    vector<vector<int>> intervals3 = {{1, 4}, {2, 3}, {3, 4}};
    vector<int> res3 = sol.findRightInterval(intervals3);
    for (int r : res3)
        cout << r << " ";
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(n)
 *
 */