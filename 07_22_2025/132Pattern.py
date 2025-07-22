"""

Given an array nums, check whether a 132 pattern exists. A 132 pattern is a subsequence of three 
numbers nums[i], nums[j], and nums[k] such that nums[i] < nums[k] < nums[j]. The key insight is 
to traverse from right to left, keeping track of possible nums[k] values. We use a monotonic 
decreasing stack to track possible nums[j] candidates and maintain a variable third to represent 
the best possible nums[k] seen so far.

"""

from typing import List

class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        stack = []
        third = float('-inf')

        for i in reversed(range(len(nums))):
            if nums[i] < third:
                return True
            while stack and nums[i] > stack[-1]:
                third = stack.pop()
            stack.append(nums[i])

        return False

def main():
    nums = [3, 1, 4, 2]
    solution = Solution()
    result = solution.find132pattern(nums)
    print("132 pattern exists:", result)

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(n)

"""