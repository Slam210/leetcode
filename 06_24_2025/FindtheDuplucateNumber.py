"""

Given a list, find the duplucate number without modifying the array and using
constant space. The idea behind this problem is to use the cycle detection method
to find the duplucate. We start by using tortoise and hare to detect the cycle.
Once they meet, why reset one pointer and iterate till they are at the entrace to the cycle.

"""

from typing import List

class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow = nums[0]
        fast = nums[0]

        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break

        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]

        return slow

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 3, 4, 2, 2]
    print(f"The duplicate number is: {sol.findDuplicate(nums)}")

"""

Time complexity is O(n)
Space complexity is O(1)

"""