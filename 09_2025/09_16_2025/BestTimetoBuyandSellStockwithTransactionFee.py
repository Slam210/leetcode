"""

We solve this by treating the problem as state transitions. Each day, we decide whether to hold or not hold a stock. 
If we hold, the maximum profit is the better of staying in hold or buying today. If we don’t hold, the maximum profit 
is the better of staying without stock or selling today. By updating these two states across all days, we ensure we 
account for all transactions and fees.

"""

from typing import List

class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        n = len(prices)
        if n == 0:
            return 0

        cash = 0
        hold = -prices[0]
        
        for i in range(1, n):
            cash = max(cash, hold + prices[i] - fee)
            hold = max(hold, cash - prices[i])
        
        return cash

def main():
    sol = Solution()
    print(sol.maxProfit([1,3,2,8,4,9], 2))  
    print(sol.maxProfit([1,3,7,5,10,3], 3))

if __name__ == "__main__":
    main()
    
"""

Time complexity is O(n)
Space complexity is O(1)

"""