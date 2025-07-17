/**
 *
 * We're given two strings s and p. We need to find all starting indices in s where a substring
 * is an anagram of p. This is a classic sliding window + frequency counter problem. Both s and
 * p consist of lowercase letters → we can use arrays of size 26 to track letter counts. Instead
 * of checking every substring with sorting, we use a fixed-size sliding window of size p.length()
 * over s. We also maintain a character frequency count of the window. Compare the frequency array
 * of the window to that of p. If the frequency arrays match → it's an anagram → record the starting index.
 *
 */

#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution
{
public:
    vector<int> findAnagrams(string s, string p)
    {
        vector<int> result;
        if (s.length() < p.length())
            return result;

        vector<int> pCount(26, 0), windowCount(26, 0);

        for (char c : p)
            pCount[c - 'a']++;

        for (int i = 0; i < p.length(); ++i)
        {
            windowCount[s[i] - 'a']++;
        }
        if (windowCount == pCount)
            result.push_back(0);

        for (int i = p.length(); i < s.length(); ++i)
        {
            windowCount[s[i - p.length()] - 'a']--;
            windowCount[s[i] - 'a']++;

            if (windowCount == pCount)
            {
                result.push_back(i - p.length() + 1);
            }
        }

        return result;
    }
};

int main()
{
    Solution sol;

    string s1 = "cbaebabacd";
    string p1 = "abc";
    auto result1 = sol.findAnagrams(s1, p1);
    cout << "Example 1 Output: ";
    for (int idx : result1)
        cout << idx << " ";
    cout << endl;

    string s2 = "abab";
    string p2 = "ab";
    auto result2 = sol.findAnagrams(s2, p2);
    cout << "Example 2 Output: ";
    for (int idx : result2)
        cout << idx << " ";
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */