#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
#include <cctype>

using namespace std;

class Solution
{
public:
    vector<string> findWords(vector<string> &words)
    {
        unordered_map<char, int> row;
        string row0 = "qwertyuiop", row1 = "asdfghjkl", row2 = "zxcvbnm";

        for (char c : row0)
            row[c] = 0;
        for (char c : row1)
            row[c] = 1;
        for (char c : row2)
            row[c] = 2;

        vector<string> result;
        for (string word : words)
        {
            int r = row[tolower(word[0])];
            bool valid = true;
            for (char c : word)
            {
                if (row[tolower(c)] != r)
                {
                    valid = false;
                    break;
                }
            }
            if (valid)
                result.push_back(word);
        }
        return result;
    }
};

int main()
{
    Solution sol;
    vector<string> words = {"Hello", "Alaska", "Dad", "Peace"};

    vector<string> result = sol.findWords(words);

    cout << "Words typed on one keyboard row:\n";
    for (const string &word : result)
    {
        cout << word << " ";
    }
    cout << endl;

    return 0;
}
