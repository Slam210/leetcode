/**
 *
 * Convert a 32-bit signed integer to its hexadecimal representation as a string.
 * The intuition is to realize we can exract the last 4 bits and then convert that
 * to hex, adding it to the resulting string until we can no longer do it.
 *
 */

#include <iostream>
#include <string>

using namespace std;

class Solution
{
public:
    string toHex(int num)
    {
        if (num == 0)
            return "0";

        string hexChars = "0123456789abcdef";
        string result;

        unsigned int n = static_cast<unsigned int>(num); 

        for (int i = 0; i < 8 && n != 0; ++i)
        {
            int hexDigit = n & 0xF; 
            result = hexChars[hexDigit] + result;
            n >>= 4; 
        }

        return result;
    }
};

int main()
{
    Solution sol;
    cout << sol.toHex(26) << endl;
    return 0;
}

/**
 * 
 * Time complexity is O(1) with 8 max iterations
 * Space complexity is O(1)
 * 
 */