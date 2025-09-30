"""

We observe that triangulating between two fixed endpoints reduces to choosing an intermediate vertex that splits the polygon into two smaller polygons. 
Therefore we set up a DP table dp[i][j] for the minimal score of the sub-polygon from i to j, iteratively compute values for increasing interval lengths, 
and for each interval try every possible intermediate vertex k to combine sub-results plus the triangle cost values[i]*values[k]*values[j]. This dynamic 
approach guarantees we explore the optimal composition of sub-triangulations and yields the minimum total score.

"""

from typing import List

class Solution:
    def minScoreTriangulation(self, values: List[int]) -> int:
        n = len(values)
        if n < 3:
            return 0
        dp = [[0] * n for _ in range(n)]
        
        for length in range(3, n + 1):
            for i in range(0, n - length +1):
                j = i + length - 1
                best = 10**9
                for k in range(i + 1, j):
                    cost = dp[i][k] + dp[k][j] + values[i] * values[k] * values[j]
                    if cost < best:
                        best = cost
                    dp[i][j] = best
                    
        return dp[0][n-1]
    
def main():
    s = Solution()
    tests = [
        [1, 2, 3],            
        [3, 7, 4, 5],        
        [1, 3, 1, 3, 1],     
        [6, 4, 1, 5, 3, 2]     
    ]
    for vals in tests:
        print(f"values = {vals} -> min score = {s.minScoreTriangulation(vals)}")

if __name__ == "__main__":
    main()

"""

Time complexity is O(n^3)
Space complexity is O(n^2)

"""