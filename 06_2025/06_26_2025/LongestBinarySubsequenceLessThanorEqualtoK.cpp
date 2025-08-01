/**
 *
 * We can given a binary string s, and an integer k. We are to find the
 * longest binary sequence form s that is less than or equal to k.
 * The intuition behind this is to use a sliding window technique where
 * we scan the string from right to left to try to increase the subsequence
 * as much as possible.
 *
 */

#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

class Solution
{
public:
    int longestSubsequence(string s, int k)
    {
        int zeroes = 0;

        for (int i = 0; i < s.size(); i++)
        {
            if (s[i] == '0')
            {
                zeroes++;
            }
        }

        int onesIncluded = 0;
        long long val = 0;
        long long power = 1;

        for (int i = s.size() - 1; i >= 0; --i)
        {
            if (s[i] == '1')
            {
                if (val + power <= k)
                {
                    val += power;
                    ++onesIncluded;
                }
            }
            power <<= 1;
            if (power > k)
                break;
        }

        return zeroes + onesIncluded;
    }
};

int main()
{
    Solution sol;
    string s = "1001010";
    int k = 5;
    cout << "Longest Subsequence Length: " << sol.longestSubsequence(s, k) << endl;
    return 0;
}

/**
 *
 * Run time is O(n) as we do one iteration
 * Space complexity is O(1)
 *
 */