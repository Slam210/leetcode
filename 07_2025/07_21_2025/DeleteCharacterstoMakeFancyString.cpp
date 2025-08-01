#include <iostream>
#include <string>
using namespace std;

class Solution
{
public:
    string makeFancyString(string s)
    {
        if (s.empty())
            return "";

        string result = "";
        int count = 1;

        result += s[0];

        for (int i = 1; i < s.length(); ++i)
        {
            if (s[i] == s[i - 1])
            {
                count++;
            }
            else
            {
                count = 1;
            }

            if (count <= 2)
            {
                result += s[i];
            }
        }

        return result;
    }
};

int main()
{
    Solution solution;

    // Test cases
    string input1 = "aaabaaaa";
    string input2 = "aab";
    string input3 = "abc";
    string input4 = "aabbbaaabbb";

    cout << "Input: " << input1 << " -> Fancy: " << solution.makeFancyString(input1) << endl;
    cout << "Input: " << input2 << " -> Fancy: " << solution.makeFancyString(input2) << endl;
    cout << "Input: " << input3 << " -> Fancy: " << solution.makeFancyString(input3) << endl;
    cout << "Input: " << input4 << " -> Fancy: " << solution.makeFancyString(input4) << endl;

    return 0;
}
