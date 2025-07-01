"""

Given an array, we want to ensure that the subset we return is modulo 0 for every
index of a % b == 0 or b % a == 0. This problem is similar to Longest Increasing 
Subsequence, but instead of increasing numbers, we care about divisibility between elements.
We can sort the array so that if a < b, and b % a == 0, then a can come before b in the subset.
For each element, find the largest subset ending at that element. Use DP to track the largest subset at each index.

"""

from typing import List

class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        if not nums:
            return []

        nums.sort()
        n = len(nums)
        dp = [1] * n         
        prev = [-1] * n      
        max_idx = 0    

        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0:
                    if dp[j] + 1 > dp[i]:
                        dp[i] = dp[j] + 1
                        prev[i] = j
            if dp[i] > dp[max_idx]:
                max_idx = i

        result = []
        while max_idx != -1:
            result.append(nums[max_idx])
            max_idx = prev[max_idx]

        return result[::-1]


if __name__ == "__main__":
    solution = Solution()
    test_cases = [
        [1, 2, 3],         
        [1, 2, 4, 8],       
        [3, 5, 10, 20, 21],
        [4, 8, 10, 240],   
    ]
    for nums in test_cases:
        print(f"Input: {nums} → Output: {solution.largestDivisibleSubset(nums)}")

"""

Time complexity is O(n^2)
Space complexity is O(n)

"""