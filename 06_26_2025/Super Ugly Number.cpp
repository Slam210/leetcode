/**
 *
 * The problem gives us a positive integer n, and an array of integer primes.
 * We are tasked with finding the nth super ugly number, a number whose prime factors are
 * in the primes array, and returning it. Similar to how we solved Ugly Prime II,
 * we can solve this problem using a similar intuition where each prime maintains a pointer
 * index and a current candidate value.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    int nthSuperUglyNumber(int n, vector<int> &primes)
    {
        vector<int> ugly(n);
        ugly[0] = 1;

        int k = primes.size();
        vector<int> indices(k, 0);
        vector<long>
            candidates(primes.begin(), primes.end());

        for (int i = 1; i < n; ++i)
        {
            long next_ugly = *min_element(candidates.begin(), candidates.end());
            ugly[i] = (int)next_ugly;

            for (int j = 0; j < k; ++j)
            {
                if (candidates[j] == next_ugly)
                {
                    indices[j]++;
                    candidates[j] = (long)primes[j] * ugly[indices[j]];
                }
            }
        }

        return ugly[n - 1];
    }
};

int main()
{
    Solution sol;
    int n = 12;
    vector<int> primes = {2, 7, 13, 19};
    cout << "The " << n << "th super ugly number is: " << sol.nthSuperUglyNumber(n, primes) << endl;
    return 0;
}

/**
 *
 * Time complexity is O(n * k)
 * Space complexity is O(n + k)
 *
 */