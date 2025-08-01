/*

This is essentially the original House Robber problem with one key constraint.
Because the houses are in a circle, we can't rob both the first and last houses.
So, we break this into two separate cases We rob houses from index 0 to n-2
or rob houses from index 1 to n-1. Take the maximum of the two.
This reduces to solving the linear house robber problem twice.

*/

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int robLinear(const vector<int> &nums, int start, int end)
{
    int prev1 = 0, prev2 = 0;

    for (int i = start; i <= end; ++i)
    {
        int current = max(prev1, nums[i] + prev2);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

class Solution
{
public:
    int rob(vector<int> &nums)
    {
        int n = nums.size();
        if (n == 1)
            return nums[0];
        if (n == 2)
            return max(nums[0], nums[1]);

        return max(
            robLinear(nums, 0, n - 2),
            robLinear(nums, 1, n - 1));
    }
};

int main()
{
    Solution solution;
    vector<int> nums = {2, 3, 2};

    cout << "Max money robbed: " << solution.rob(nums) << endl;
    return 0;
}

/*

Time compleixty is O(n) as each linear rob is O(n)
Space complexity is O(1)

*/