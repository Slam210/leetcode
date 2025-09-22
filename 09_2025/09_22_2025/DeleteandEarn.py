"""

We treat each unique number as a house with value equal to that number multiplied by its count. 
If we choose that house, we cannot take its direct neighbors. This is the same as the House Robber 
dynamic programming problem. We sort the keys, build up the best result with DP, and return the maximum.

"""

from typing import List
from collections import Counter

class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        if not nums:
            return 0

        counts = Counter(nums)
        max_num = max(nums)

        points = [0] * (max_num + 1)
        for num, cnt in counts.items():
            points[num] = num * cnt

        dp = [0] * (max_num + 1)
        dp[0] = 0
        dp[1] = points[1]

        for i in range(2, max_num + 1):
            dp[i] = max(dp[i-1], dp[i-2] + points[i])

        return dp[max_num]


def main():
    sol = Solution()
    tests = [
        ([3,4,2], 6),      
        ([2,2,3,3,3,4], 9), 
        ([1], 1),
        ([8,10,4,9,1,3,5,9,4,10], 37),
        ([], 0),
    ]

    for nums, expected in tests:
        result = sol.deleteAndEarn(nums)
        print(f"nums = {nums}\n -> result = {result}    expected = {expected}\n")


if __name__ == "__main__":
    main()

"""

Time complexity is O(n + m)
Space complexity is O(m)

"""