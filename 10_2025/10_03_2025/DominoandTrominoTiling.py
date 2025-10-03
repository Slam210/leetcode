"""

We are tasked with tiling a 2 x n board using dominoes and trominoes. 
By observing how tiles can be placed, we recognize that the number of tilings for size n depends on previously solved smaller boards
where tilings of n-1, n-2, and n-3. Placing a vertical domino leaves a 2 x (n-1) board, placing two horizontal dominoes leaves a 2 x (n-2) board, 
and placing trominoes connects configurations from both 2 x (n-1) and 2 x (n-3). This yields the recurrence dp[n]=2dp[n−1]+dp[n−3], which we can 
solve using dynamic programming with modulo  10^9+7.

"""

class Solution:
    def numTilings(self, n: int) -> int:
        MOD = 10**9 + 7

        if n == 0:
            return 1
        if n == 1:
            return 1
        if n == 2:
            return 2

        dp = [0] * (n+1)
        dp[0], dp[1], dp[2] = 1, 1, 2

        for i in range(3, n+1):
            dp[i] = (2 * dp[i-1] + dp[i-3]) % MOD

        return dp[n]


if __name__ == "__main__":
    sol = Solution()
    tests = [
        (1, 1), 
        (2, 2),  
        (3, 5), 
        (4, 11), 
    ]
    for n, expected in tests:
        result = sol.numTilings(n)
        print(f"n={n} -> {result} (expected {expected})")

"""

Time complexity is O(n)
Space complexity is O(n)

"""