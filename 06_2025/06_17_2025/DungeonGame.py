"""

The intuition behind this priblem is to traverse this problem in the style of a graph/
The knight must not die at any point. Health must always be ≥ 1.
Start at the top-left, end at bottom-right.
Can only move right or down.
Find the minimum initial health needed to survive until rescuing the princess.
We can accomplish this through the use of dp

"""

from typing import List

class Solution:
    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        m, n = len(dungeon), len(dungeon[0])
        dp = [[float('inf')] * (n + 1) for _ in range(m + 1)]
        dp[m][n - 1] = dp[m - 1][n] = 1

        for i in reversed(range(m)):
            for j in reversed(range(n)):
                min_hp_needed = min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]
                dp[i][j] = max(1, min_hp_needed)

        return dp[0][0]

if __name__ == "__main__":
    dungeon = [
        [-2, -3, 3],
        [-5, -10, 1],
        [10, 30, -5]
    ]
    solution = Solution()
    print("Minimum initial health needed:", solution.calculateMinimumHP(dungeon))  # Output: 7

"""

Time complexity is O(m * n) as each cell is visited once
Space complexity is O(m * n) as that is the size of the dp table

"""