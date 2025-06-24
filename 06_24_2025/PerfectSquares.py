"""

The idea is to find the minimum number of perfect square numbers that add up to n.
It resembles the "coin change" problem as we can treat each perfect square ≤ n 
as a "coin". We want the minimum number of such "coins" to make up the value n.
We use dynnamic programming to solve this problem.

"""

class Solution:
    def numSquares(self, n: int) -> int:
        squares = []
        for i in range(1, int(n**0.5) +1):
            squares.append(i*i)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            for square in squares:
                if square > i:
                    break
                dp[i] = min(dp[i], dp[i - square] + 1)
        return dp[n]

"""

Time complexity is O(n√n)
Space complexity is O(n)

"""