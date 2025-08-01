/**
 *
 * We are given n lightbulbs that are initially off. For the first round, we
 * toggle all lightbulbs on, then turn off every second bulb.For the ith round, we
 * toggle the ith bulb. For the nth round, we toggle only the last bulb. we
 * return the number of bulbs on after n rounds. The intuition behind this problem is to realize
 * that a bulb at position i is toggled in every round d where d is a divisor of i.
 * This means each bulb is toggled once for every divisor it has. Normally, divisors come in pairs,
 * so bulbs are toggled an even number of times and end up off. However, perfect squares have a middle
 * divisor that repeats, giving them an odd number of total divisors. As a result, only bulbs at positions
 * that are perfect squares are toggled an odd number of times and remain on.
 *
 */

#include <iostream>
#include <cmath>

using namespace std;

class Solution
{
public:
    int bulbSwitch(int n)
    {
        return sqrt(n);
    }
};

int main()
{
    Solution sol;
    cout << sol.bulbSwitch(5) << endl;
    return 0;
}

/**
 *
 * Time complexity is O(1)
 * Space complexity is O(1)
 *
 */