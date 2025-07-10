/**
 *
 * Remove exactly k digits to make the resulting number as small as possible, and return it as
 * a string without leading zeros, unless the result is "0". We want the smallest possible number, 
 * so we should remove digits from left to right, and prefer removing larger digits that come
 * before smaller ones. To do this we use a monotonic increasing stack to maintain digits. At 
 * each step, while the current digit is smaller than the top of the stack pop the stack, decrease 
 * k, and push the current digit. At the end if k > 0, remove digits from the end of the stack. 
 * Remove leading zeros from the final result.
 *
 */

#include <iostream>
#include <string>
using namespace std;

class Solution
{
public:
    string removeKdigits(string num, int k)
    {
        string stack;

        for (char digit : num)
        {
            while (!stack.empty() && k > 0 && stack.back() > digit)
            {
                stack.pop_back();
                --k;
            }
            stack.push_back(digit);
        }

        // If we still have k digits to remove, remove from the end
        while (k > 0 && !stack.empty())
        {
            stack.pop_back();
            --k;
        }

        int i = 0;
        while (i < stack.size() && stack[i] == '0')
        {
            ++i;
        }

        string result = stack.substr(i);
        return result.empty() ? "0" : result;
    }
};

/**
 * 
 * Run time is O(n)
 * Space complexity is O(n)
 * 
 */