"""

We treat this as the longest common substring problem. Using dynamic programming, we compute the 
longest suffix matches between prefixes of the arrays. Each match extends the previous suffix length.
Mismatches reset to zero. The global maximum across all indices gives the length of the longest common subarray.

"""

from typing import List

class Solution:
    def findLength(self, nums1: List[int], nums2: List[int]) -> int:
        m, n = len(nums1), len(nums2)
        dp = [0] * (n + 1)
        max_len = 0

        for i in range(1, m + 1):
            new_dp = [0] * (n + 1)
            for j in range(1, n + 1):
                if nums1[i-1] == nums2[j-1]:
                    new_dp[j] = dp[j-1] + 1
                    max_len = max(max_len, new_dp[j])
            dp = new_dp

        return max_len

def main():
    sol = Solution()
    print(sol.findLength([1,2,3,2,1], [3,2,1,4,7]))  
    print(sol.findLength([0,0,0,0,0], [0,0,0,0,0]))  

if __name__ == "__main__":
    main()

"""

Time complexity is O(m * n)
Space complexity is O(n)

"""