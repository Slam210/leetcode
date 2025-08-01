from typing import List

class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        if not prices:
            return 0
        
        n = len(prices)
        
        if k >= n // 2:
            profit = 0
            for i in range(1, n):
                if prices[i] > prices[i - 1]:
                    profit += prices[i] - prices[i - 1]
            return profit
        
        dp = [[[0]*2 for _ in range(k+1)] for _ in range(n)]
        
        for t in range(k+1):
            dp[0][t][0] = 0
            dp[0][t][1] = -prices[0]
        
        for i in range(1, n):
            for t in range(1, k+1):
                dp[i][t][0] = max(dp[i-1][t][0], dp[i-1][t][1] + prices[i])
                dp[i][t][1] = max(dp[i-1][t][1], dp[i-1][t-1][0] - prices[i])
        
        return dp[-1][k][0]

if __name__ == "__main__":
    solution = Solution()
    prices = [3,2,6,5,0,3]
    print(solution.maxProfit(2,prices))

"""

Time complexity is O(n * k)
Space complexity is O(n * k * 2)

"""