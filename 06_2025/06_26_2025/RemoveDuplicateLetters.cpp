/**
 *
 * We are given a string s. Out goal is to remove as many duplicate
 * letters as possible so that each letter only appears once. Additionally,
 * we want the result to be as small as possible lexographically.
 * The intuition behind this problem is to keep characters as early as possible,
 * skip duplicates, and be able to backtrack somehow to delete previous characters.
 * To solve this, we can use a stack to maintain out string, popping only if we
 * know the letter will appear again later.
 *
 */

#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Solution
{
public:
    string removeDuplicateLetters(string s)
    {
        vector<int> count(26, 0);
        vector<bool> visited(26, false);

        for (char c : s)
        {
            count[c - 'a']++;
        }

        string stack = "";

        for (char c : s)
        {
            count[c - 'a']--;

            if (visited[c - 'a'])
                continue;

            while (!stack.empty() && c < stack.back() && count[stack.back() - 'a'] > 0)
            {
                visited[stack.back() - 'a'] = false;
                stack.pop_back();
            }

            stack.push_back(c);
            visited[c - 'a'] = true;
        }

        return stack;
    }
};

int main()
{
    Solution sol;
    string s = "cbacdcbc";
    cout << "Result: " << sol.removeDuplicateLetters(s) << endl;
    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexoty is O(1)
 *
 */