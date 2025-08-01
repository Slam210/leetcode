/**
 *
 * Given a string queryIP, determine whether it is a valid IPv4 address  or valid IPv6 address.
 * Otherwise, return "Neither". The format of the string and its delimiter gives away which type it
 * could be. If it contains ".", it's a candidate for IPv4. If it contains ":", it's a candidate for
 * IPv6. Anything else is invalid. We validate each part of the string based on the number of segments
 * and  the content of each segment.
 *
 */

#include <iostream>
#include <sstream>
#include <vector>
#include <string>
#include <algorithm>
#include <cctype>

using namespace std;

class Solution
{
public:
    string validIPAddress(string queryIP)
    {
        if (count(queryIP.begin(), queryIP.end(), '.') == 3 && isIPv4(queryIP))
        {
            return "IPv4";
        }
        if (count(queryIP.begin(), queryIP.end(), ':') == 7 && isIPv6(queryIP))
        {
            return "IPv6";
        }
        return "Neither";
    }

private:
    bool isIPv4(const string &IP)
    {
        vector<string> parts = split(IP, '.');
        if (parts.size() != 4)
            return false;
        for (const string &part : parts)
        {
            if (part.empty() || (part.size() > 1 && part[0] == '0'))
                return false;
            if (!all_of(part.begin(), part.end(), ::isdigit))
                return false;
            try
            {
                int num = stoi(part);
                if (num < 0 || num > 255)
                    return false;
            }
            catch (...)
            {
                return false;
            }
        }
        return true;
    }

    bool isIPv6(const string &IP)
    {
        vector<string> parts = split(IP, ':');
        if (parts.size() != 8)
            return false;
        for (const string &part : parts)
        {
            if (part.empty() || part.size() > 4)
                return false;
            for (char c : part)
            {
                if (!isxdigit(c))
                    return false;
            }
        }
        return true;
    }

    vector<string> split(const string &s, char delim)
    {
        vector<string> parts;
        string part;
        istringstream ss(s);
        while (getline(ss, part, delim))
        {
            parts.push_back(part);
        }
        return parts;
    }
};

int main()
{
    Solution sol;

    cout << sol.validIPAddress("172.16.254.1") << endl;
    cout << sol.validIPAddress("2001:0db8:85a3:0000:0000:8a2e:0370:7334") << endl;
    cout << sol.validIPAddress("256.256.256.256") << endl;
    cout << sol.validIPAddress("1e1.4.5.6") << endl;
    cout << sol.validIPAddress("2001:db8:85a3::8A2E:037j:7334") << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */