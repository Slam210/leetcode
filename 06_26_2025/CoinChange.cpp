/**
 *
 * The goal is to find the minimum number of coins needed to make up a given amount,
 * using any combination of the provided coins, where each coin can be used an
 * infinite number of times. Think of this as a bottom-up problem where we try to
 * build the answer for smaller amounts first and use those to construct the answer for
 * the final amount. This avoids recalculating the minimum for sub-amounts multiple times,
 * which would be inefficient.
 *
 */

#include <iostream>
#include <vector>
#include <climits>

using namespace std;

class Solution
{
public:
    int coinChange(vector<int> &coins, int amount)
    {
        vector<int> dp(amount + 1, INT_MAX);
        dp[0] = 0;

        for (int i = 1; i <= amount; ++i)
        {
            for (int coin : coins)
            {
                if (coin <= i && dp[i - coin] != INT_MAX)
                {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] == INT_MAX ? -1 : dp[amount];
    }
};

int main()
{
    Solution solution;
    vector<int> coins = {1, 2, 5};
    int amount = 11;

    int result = solution.coinChange(coins, amount);
    cout << "Minimum coins needed: " << result << endl;

    return 0;
}

/**
 *
 * Time complexity is O(amount * n)
 * Space complexity is O(amount)
 *
 */