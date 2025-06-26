/**
 *
 * When bursting a balloon, the coins gained depend on its neighbors. But after bursting,
 * the array changes, making it difficult to simulate sequential popping in a greedy way.
 * So instead of thinking "burst this balloon first", we think in reverse. This is because
 * when we pop a balloon last in a range, we know its neighbors will not be affected anymore.
 * This fixed structure allows us to compute values recursively.  We define a function dp(left, right)
 * to represent the maximum coins that can be obtained by bursting all the balloons between left and right.
 * We will then try bursting every possible balloon i in this interval last and compute the
 * result recursively for the left and right parts.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    int dp(int left, int right, vector<vector<int>> &memo, vector<int> &balloons)
    {
        if (left + 1 == right)
            return 0;
        if (memo[left][right] != -1)
            return memo[left][right];

        int maxCoins = 0;
        for (int i = left + 1; i < right; ++i)
        {
            int coins = balloons[left] * balloons[i] * balloons[right];
            coins += dp(left, i, memo, balloons) + dp(i, right, memo, balloons);
            maxCoins = max(maxCoins, coins);
        }

        return memo[left][right] = maxCoins;
    }

    int maxCoins(vector<int> &nums)
    {
        vector<int> balloons;
        balloons.push_back(1);
        balloons.insert(balloons.end(), nums.begin(), nums.end());
        balloons.push_back(1);

        int n = balloons.size();
        vector<vector<int>> memo(n, vector<int>(n, -1));
        return dp(0, n - 1, memo, balloons);
    }
};

int main()
{
    Solution solution;
    vector<int> nums = {3, 1, 5, 8};
    cout << "Max coins: " << solution.maxCoins(nums) << endl;
    return 0;
}

/**
 *
 * Time complexity is O(n^3)
 * Space complexity is O(n^2)
 *
 */