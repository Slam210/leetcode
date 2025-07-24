/**
 *
 * The problem asks how many times a string s2 repeated n2 times can be formed as a subsequence from
 * another string s1 repeated n1 times. The key challenge is efficiently simulating the matching process
 * without building the full repeated strings, which would be too large. The intuition is to iterate
 * through s1 while trying to match characters of s2 in order. Every time a full s2 is matched, we
 * increment a counter. To handle large inputs, we use cycle detection: if we revisit a state after
 * some rounds through s1, we know a pattern has emerged. We can then fast-forward by calculating how
 * many times that cycle can repeat in the remaining rounds, significantly reducing computation time.
 *
 */

#include <iostream>
#include <unordered_map>
#include <string>

using namespace std;

class Solution
{
public:
    int getMaxRepetitions(string s1, int n1, string s2, int n2)
    {
        if (n1 == 0)
            return 0;

        int len1 = s1.length(), len2 = s2.length();
        int index2 = 0, count2 = 0;

        // Map to record when we revisit the same state (for cycle detection)
        unordered_map<int, pair<int, int>> seen;

        for (int i = 0; i < n1; ++i)
        {
            // Match characters of s1 with s2
            for (int j = 0; j < len1; ++j)
            {
                if (s1[j] == s2[index2])
                {
                    index2++;
                    if (index2 == len2)
                    {
                        index2 = 0;
                        count2++;
                    }
                }
            }

            // If this state has been seen before, a cycle is detected
            if (seen.count(index2))
            {
                auto [prev_i, prev_count2] = seen[index2];

                int cycle_len = i - prev_i;
                int cycle_count2 = count2 - prev_count2;

                // Fast-forward the cycles
                int remaining = (n1 - 1 - i) / cycle_len;
                count2 += remaining * cycle_count2;
                i += remaining * cycle_len;
            }
            else
            {
                // Record the state
                seen[index2] = {i, count2};
            }
        }

        // Return how many times s2 can be repeated in the matched result
        return count2 / n2;
    }
};

int main()
{
    Solution sol;
    cout << sol.getMaxRepetitions("acb", 4, "ab", 2) << endl;
    cout << sol.getMaxRepetitions("acb", 1, "acb", 1) << endl;
    return 0;
}

/**
 *
 * Time complexity is O(len1 * cycleLength)
 * Space complexity is O(len2)
 *
 */