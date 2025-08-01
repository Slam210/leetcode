"""

Given an array, find the h-index where the value is equal to the amount
of papers with that amount or more citations. We can solve this problem
using a binary search.

"""

from typing import List

class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        left, right = 0, n - 1
        
        while left <= right:
            mid = (left + right) // 2
            if citations[mid] >= n - mid:
                right = mid - 1
            else:
                left = mid + 1
        
        return n - left

if __name__ == "__main__":
    sol = Solution()
    print(sol.hIndex([0, 1, 3, 5, 6])) 

"""

Time compleixty is O(log(n))
Space complexity is O(1)

"""