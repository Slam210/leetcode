/**
 *
 * Two players take turns choosing unique integers from 1 to maxChoosableInteger. Once a number is
 * chosen, it cannot be chosen again. Each picked number is added to a running total. The first
 * player to cause the total to reach or exceed desiredTotal wins. Return true if the first player
 * can guarantee a win, assuming both play optimally.  Since numbers cannot be reused, the game
 * state is determined by which numbers have already been used and the current running total. At
 * each turn, the player can choose any unused number. The goal is to see if there is any choice
 * that leads the opponent into a losing state. This leads to a recursive solution where the player
 * chooses a number, simulates the opponent's best response, and if any choice guarantees a win.
 *
 */

#include <iostream>
#include <unordered_map>

using namespace std;

class Solution
{
public:
    unordered_map<int, bool> memo;

    bool canIWin(int maxChoosableInteger, int desiredTotal)
    {
        int sum = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;
        if (sum < desiredTotal)
            return false;
        if (desiredTotal <= 0)
            return true;

        return canWin(maxChoosableInteger, 0, desiredTotal);
    }

private:
    bool canWin(int maxInt, int used, int target)
    {
        if (memo.count(used))
            return memo[used];

        for (int i = 1; i <= maxInt; ++i)
        {
            int mask = 1 << (i - 1);
            if ((used & mask) == 0)
            {
                if (i >= target || !canWin(maxInt, used | mask, target - i))
                {
                    return memo[used] = true;
                }
            }
        }
        return memo[used] = false;
    }
};

int main()
{
    Solution sol;

    int maxChoosableInteger = 10;
    int desiredTotal = 11;
    cout << boolalpha << "Can I win? " << sol.canIWin(maxChoosableInteger, desiredTotal) << endl;

    maxChoosableInteger = 10;
    desiredTotal = 40;
    cout << boolalpha << "Can I win? " << sol.canIWin(maxChoosableInteger, desiredTotal) << endl;

    return 0;
}

/**
 *
 * Time complexity is O(2^N * N) where N is maxChoosableInteger
 * Space complexity is (2^N) for memoization and O(N) for call stack
 *
 */