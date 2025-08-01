/**
 *
 * Given a string s, return a new string where characters are sorted in decreasing order of
 * frequency. We want to group characters by how often they occur, then sort them by frequency
 * descending. This problem is ideal for a hashmap + sorting.
 *
 */

#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>
using namespace std;

class Solution
{
public:
    string frequencySort(string s)
    {
        unordered_map<char, int> freq;
        for (char c : s)
            freq[c]++;

        vector<vector<char>> buckets(s.size() + 1);
        for (auto &[ch, count] : freq)
        {
            buckets[count].push_back(ch);
        }

        string result;
        for (int i = buckets.size() - 1; i > 0; --i)
        {
            for (char c : buckets[i])
            {
                result.append(i, c);
            }
        }

        return result;
    }
};

int main()
{
    Solution solution;

    string s1 = "tree";
    string s2 = "cccaaa";
    string s3 = "Aabb";

    cout << "Input: " << s1 << " -> Output: " << solution.frequencySort(s1) << endl;
    cout << "Input: " << s2 << " -> Output: " << solution.frequencySort(s2) << endl;
    cout << "Input: " << s3 << " -> Output: " << solution.frequencySort(s3) << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n + k)
 * Space complexity is O(n + k)
 *
 */