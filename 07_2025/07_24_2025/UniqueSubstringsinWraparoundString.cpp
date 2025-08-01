/**
 *
 * We are given a string s consisting of lowercase English letters. A substring is considered valid
 * if it appears in base as a contiguous sequence and follows the order 'a' to 'z', wrapping from
 * 'z' back to 'a'. We need to return how many unique non-empty substrings of s are present in base.
 * Instead of checking all substrings (which is O(n²)), we can track the longest valid substrings
 * ending in each character. If a substring ends in 'c' and is 3 characters long, say "abc", then "c"
 * is a valid substring,  "bc" is valid, and "abc" is valid So the number of valid substrings ending
 * in 'c' is equal to the length of the longest valid consecutive sequence ending in 'c'. We do this
 * for all 26 characters and sum up the lengths.
 *
 */

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class Solution
{
public:
    int findSubstringInWraproundString(string s)
    {
        vector<int> dp(26, 0);
        int currentLen = 0;

        for (int i = 0; i < s.length(); ++i)
        {
            if (i > 0 && (s[i] - s[i - 1] + 26) % 26 == 1)
            {
                currentLen++;
            }
            else
            {
                currentLen = 1;
            }
            int index = s[i] - 'a';
            dp[index] = max(dp[index], currentLen);
        }

        int result = 0;
        for (int count : dp)
            result += count;
        return result;
    }
};

int main()
{
    Solution sol;

    cout << sol.findSubstringInWraproundString("a") << endl;
    cout << sol.findSubstringInWraproundString("cac") << endl;
    cout << sol.findSubstringInWraproundString("zab") << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is (1)
 *
 */