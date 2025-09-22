"""

We treat the problem as two people moving from the top-left to the bottom-right at the same time, each step advancing one unit. 
Both paths together simulate going forward and back. At each step, we calculate how many cherries can be collected (careful not 
to double count when both stand on the same cell), and recursively explore the four possible move combinations, taking the maximum. 
With memoization, we efficiently compute the best outcome.

"""

from typing import List
from functools import lru_cache

class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)

        @lru_cache(None)
        def dp(r1: int, c1: int, r2: int) -> int:
            # because steps are equal
            c2 = r1 + c1 - r2  
            # Out of bounds or thorn
            if r1 >= n or c1 >= n or r2 >= n or c2 >= n:
                return -10**9
            if grid[r1][c1] == -1 or grid[r2][c2] == -1:
                return -10**9

            # Reached bottom-right
            if r1 == n - 1 and c1 == n - 1:
                return grid[r1][c1]

            # Current cherries
            result = 0
            if r1 == r2 and c1 == c2:
                result += grid[r1][c1]
            else:
                result += grid[r1][c1] + grid[r2][c2]

            # Next moves 4 combinations
            result += max(
                # both down
                dp(r1 + 1, c1, r2 + 1),  
                # A right, B right
                dp(r1, c1 + 1, r2),   
                 # A down, B right   
                dp(r1 + 1, c1, r2), 
                # A right, B down    
                dp(r1, c1 + 1, r2 + 1) 
            )
            return result

        ans = dp(0, 0, 0)
        return max(ans, 0)


def main():
    sol = Solution()
    tests = [
        ([[0,1,-1],[1,0,-1],[1,1,1]], 5),
        ([[1,1,-1],[1,-1,1],[-1,1,1]], 0),
        ([[0]], 0),
        ([[1]], 1),
    ]

    for grid, expected in tests:
        result = sol.cherryPickup(grid)
        print(f"grid = {grid}\n -> result = {result}    expected = {expected}\n")


if __name__ == "__main__":
    main()

"""

Time complexity is O(n^3)
Space complexity is O(n^3)

"""