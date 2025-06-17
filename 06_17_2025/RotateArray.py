"""

The intuition behind this problem is to reverse multiple times.
We can start by reversing the entire array. Then we reverse, the part
up to k steps to bring the end to the front, Finally, we reverse the 
end to bring it back to the original format.

"""

from typing import List

class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        k %= n 
        
        def reverse(start: int, end: int) -> None:
            while start < end:
                nums[start], nums[end] = nums[end], nums[start]
                start += 1
                end -= 1

        reverse(0, n - 1)
        reverse(0, k - 1)
        reverse(k, n - 1)

if __name__ == "__main__":
    solution = Solution()
    nums = [1, 2, 3, 4, 5, 6, 7]
    k = 3
    solution.rotate(nums, k)
    print(nums) 

"""

Time complexity is O(n) since we reverse n 3 times total
Space complexity is O(1) since all we do are swaps

"""