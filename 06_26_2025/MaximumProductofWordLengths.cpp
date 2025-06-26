/**
 *
 * Given a string array of words, return the maximum value of
 * the length of 2 words multiplied that do not share letters.
 * The intuition behind this is to use bitmasking as we know each
 * word will only have lowercase letter, and we can use that bit to check
 * for duplicates.
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
    int maxProduct(vector<string> &words)
    {
        int n = words.size();
        vector<int> masks(n, 0);
        vector<int> lengths(n, 0);

        for (int i = 0; i < n; ++i)
        {
            int mask = 0;
            for (char c : words[i])
            {
                mask |= 1 << (c - 'a');
            }
            masks[i] = mask;
            lengths[i] = words[i].size();
        }

        int maxProduct = 0;
        for (int i = 0; i < n; ++i)
        {
            for (int j = i + 1; j < n; ++j)
            {
                if ((masks[i] & masks[j]) == 0)
                {
                    maxProduct = max(maxProduct, lengths[i] * lengths[j]);
                }
            }
        }

        return maxProduct;
    }
};

int main()
{
    Solution sol;
    vector<string> words = {"abcw", "baz", "foo", "bar", "xtfn", "abcdef"};
    cout << "Max Product: " << sol.maxProduct(words) << endl; // Output: 16
    return 0;
}

/**
 *
 * Time complexity is O(2^n)
 * Space complexity is O(n)
 *
 */