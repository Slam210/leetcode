/**
 *
 * We are given an integer n, the number of coins. We need to build a staircase such that the 1st
 * row has 1 coin, the 2nd row has 2 coins, the 3rd row has 3 coins and so on. Each row i requires
 * exactly i coins. Our task is to return the number of complete rows that can be formed from the n
 * coins. We want to find the maximum k such that k(k+1)/2 <= n. We use 8LL * n to ensure 64-bit
 * arithmetic to prevent overflow for large n.
 *
 */

#include <iostream>
using namespace std;

class Solution
{
public:
    int arrangeCoins(int n)
    {
        return (int)((sqrt(8LL * n + 1) - 1) / 2);
    }
};

int main()
{
    Solution sol;

    int n1 = 5;
    cout << "Example 1 Output: " << sol.arrangeCoins(n1) << endl;

    int n2 = 8;
    cout << "Example 2 Output: " << sol.arrangeCoins(n2) << endl;

    int n3 = 1e9;
    cout << "Example 3 Output: " << sol.arrangeCoins(n3) << endl;

    return 0;
}

/**
 *
 * Run time is O(1)
 * Space time is O(1)
 *
 */