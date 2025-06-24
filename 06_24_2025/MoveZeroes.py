"""

We are asked to modify an array in place, shifting all 0's to the end of the
array while mainting relative order. The intuition for this is to use a pointer
to keep track of the index where we can write. Should we find a 0, we do not increment
otherwise we can write to the pointer index and increment. Afterward, we just need
to fill up the rest of the array with 0.

"""

from typing import List

class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        write = 0 
        
        for read in range(len(nums)):
            if nums[read] != 0:
                nums[write] = nums[read]
                write += 1
        
        for i in range(write, len(nums)):
            nums[i] = 0

if __name__ == "__main__":
    nums = [0, 1, 0, 3, 12]
    Solution().moveZeroes(nums)
    print(nums)

"""

Time complexity is O(n)
Space complexity is O(1)

"""