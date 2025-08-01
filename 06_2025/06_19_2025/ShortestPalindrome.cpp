/*

Given a string s, we want to add the minimum number of characters in front of it to make it a palindrome.
The key is to find the longest palindromic prefix of s. Then, reverse the remaining suffix, and prepend it.

*/

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution
{
public:
    string shortestPalindrome(string s)
    {
        string rev = s;
        reverse(rev.begin(), rev.end());
        string combined = s + "#" + rev;

        vector<int> lps(combined.size(), 0);
        for (int i = 1; i < combined.size(); ++i)
        {
            int len = lps[i - 1];
            while (len > 0 && combined[i] != combined[len])
            {
                len = lps[len - 1];
            }
            if (combined[i] == combined[len])
            {
                ++len;
            }
            lps[i] = len;
        }

        int palLen = lps.back();
        string suffix = s.substr(palLen);
        reverse(suffix.begin(), suffix.end());
        return suffix + s;
    }
};

int main()
{
    Solution sol;
    string s = "abcd";
    cout << sol.shortestPalindrome(s) << endl;
    return 0;
}

/*

Time complexity is O(n)
Space complexity is O(n)

*/