/**
 *
 * We are given an integer array nums and a positive integer k. We need to find the length of the
 * longest subsequence where every adjacent pair of elements (a, b) in the subsequence satisfies (a + b) % k.
 * If we can, for each pair (i, j) in nums, where i < j, check if we can append nums[j] to the
 * subsequence ending at nums[I]. We keep track of the longest subsequence ending at index i with sum mod = m.
 * Lastly, we use dynamic programming (DP) to extend these sequences.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution
{
public:
    int maximumLength(vector<int> &nums, int k)
    {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(k, 1));
        int maxLength = 1;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                int mod = (nums[j] + nums[i]) % k;
                dp[i][mod] = max(dp[i][mod], dp[j][mod] + 1);
                maxLength = max(maxLength, dp[i][mod]);
            }
        }

        return maxLength;
    }
};

int main()
{
    Solution sol;

    vector<int> nums1 = {1, 2, 3, 4, 5};
    int k1 = 2;
    cout << "Example 1 Output: " << sol.maximumLength(nums1, k1) << endl;

    vector<int> nums2 = {1, 4, 2, 3, 1, 4};
    int k2 = 3;
    cout << "Example 2 Output: " << sol.maximumLength(nums2, k2) << endl;

    return 0;
}

/**
 *
 * Run time is O(n^2)
 * Space complexity us O(n * k)
 *
 */