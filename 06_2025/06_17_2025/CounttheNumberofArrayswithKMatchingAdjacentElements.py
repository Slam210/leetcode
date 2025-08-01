"""
The intuition behind this problem lies in transforming the constraint of having 
exactly k adjacent equal elements into a segmentation problem. Specifically, in an array of length n, there are n - 1 adjacent pairs, and exactly k of them must be equal.
This implies that the remaining n - 1 - k pairs must differ, effectively dividing the array into n - k segments of values. 
The first segment can be any of the m possible values,  and each subsequent segment must differ from the previous one, giving m - 1 choices per transition. 
The number of ways to choose which k of the n - 1 adjacent positions are equal is given by the binomial coefficient C(n - 1, k). 
Therefore, the total number of valid arrays is calculated as C(n - 1, k) * m * (m - 1)^(n - 1 - k). 
This approach reduces the original problem to a combinatorics question, where we count how many ways we can distribute segments and assign values such that the repetition constraints are met. 
Efficient computation requires precomputing factorials and their modular inverses to quickly calculate combinations under the modulo 10^9 + 7.

"""

from typing import List

MOD = 10**9 + 7

class Solution:
    def countGoodArrays(self, n: int, m: int, k: int) -> int:
        if k > n - 1 or k < 0:
            return 0

        fact = [1] * (n)
        inv_fact = [1] * (n)
        
        for i in range(1, n):
            fact[i] = fact[i - 1] * i % MOD

        inv_fact[n - 1] = pow(fact[n - 1], MOD - 2, MOD)
        for i in range(n - 2, -1, -1):
            inv_fact[i] = inv_fact[i + 1] * (i + 1) % MOD

        def comb(a, b):
            if b < 0 or b > a:
                return 0
            return fact[a] * inv_fact[b] % MOD * inv_fact[a - b] % MOD

        c = comb(n - 1, k)
        pow_term = pow(m - 1, n - 1 - k, MOD)
        result = c * m % MOD * pow_term % MOD
        return result

if __name__ == "__main__":
    solution = Solution()
    print(solution.countGoodArrays(4, 3, 1))

"""

Time complexity is O(n)
Space complexity is O(n)

"""