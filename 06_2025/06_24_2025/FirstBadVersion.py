"""

The intuition behind this problem is to use a binary search on 
n to determine the number at which the first bad occurance occurs.

"""

# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        left, right = 1, n
        while left < right:
            mid = (left + right) // 2
            if isBadVersion(mid):
                right = mid
            else:
                left = mid + 1
        return left

"""

Time complexity is O(log(n))
Space complexity is O(1)

"""