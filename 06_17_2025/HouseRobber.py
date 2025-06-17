"""

The intuition behind this is that we are given a list nums where 
each nums[i] represents the amount of money at house i. 
We cannot rob two adjacent houses. Our goal is to maximize the 
amount of money robbed without robbing two adjacent houses.

"""

from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]
        
        rob1, rob2 = 0, 0
        
        for num in nums:
            newRob = max(rob2, rob1 + num)
            rob1 = rob2
            rob2 = newRob
        
        return rob2

if __name__ == "__main__":
    solution = Solution()
    test_cases = [
        [1, 2, 3, 1],    
        [2, 7, 9, 3, 1],
        [2, 1, 1, 2]  
    ]
    for nums in test_cases:
        print(f"Max rob amount from {nums}: {solution.rob(nums)}")

"""

The run time is O(n) as we only interate once
Space complexity is O(1)

"""