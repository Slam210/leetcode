/*

The intuition behind this code lies behind using something To satisfy both conditions efficiently.
The Index constraint which requires us to keep a window of size indexDiff while iterating.
The Value constraint which when within the window, find if any number is within valueDiff of the current number.
We can solve this efficiently using a something like set to maintain a sorted sliding window.

*/

#include <iostream>
#include <vector>
#include <set>
#include <cmath>

using namespace std;

class Solution
{
public:
    bool containsNearbyAlmostDuplicate(vector<int> &nums, int indexDiff, int valueDiff)
    {
        set<long long> window;

        for (int i = 0; i < nums.size(); ++i)
        {
            auto lower = window.lower_bound((long long)nums[i] - valueDiff);

            if (lower != window.end() && abs(*lower - nums[i]) <= valueDiff)
            {
                return true;
            }

            window.insert(nums[i]);

            if (i >= indexDiff)
            {
                window.erase(nums[i - indexDiff]);
            }
        }

        return false;
    }
};

int main()
{
    Solution solution;

    vector<int> nums;
    nums.push_back(1);
    nums.push_back(5);
    nums.push_back(9);
    nums.push_back(1);
    int indexDiff = 2;
    int valueDiff = 3;

    bool result = solution.containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff);
    cout << (result ? "true" : "false") << endl;

    return 0;
}

/*

Time complexity is O(n log(k))
Space complexity is O(k)

*/