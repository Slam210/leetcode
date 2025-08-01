"""

We are given a circular array nums, where each nums[i] indicates how many steps to move. Positive 
means move forward. Negative means move backward. Our task is to check if there exists a cycle of 
length > 1 such that the movement follows the values in nums circularly, the movement is entirely 
in one direction, and the cycle eventually loops back to the same index. This is a cycle detection 
problem, like the classic Floyd’s Tortoise and Hare. We must try to start from each index and attempt 
to detect a cycle. If a cycle is found from any starting point, return True. To avoid reprocessing, 
we mark elements that are already known not to be part of a cycle.

"""

from typing import List

class Solution:
    def circularArrayLoop(self, nums: List[int]) -> bool:
        n = len(nums)

        def next_index(i):
            return (i + nums[i]) % n

        for i in range(n):
            if nums[i] == 0:
                continue

            direction = nums[i] > 0 
            slow, fast = i, i

            while True:
                next_slow = next_index(slow)
                next_fast = next_index(fast)
                if nums[next_fast] * nums[fast] <= 0:
                    break
                next_fast = next_index(next_fast)
                if nums[next_fast] * nums[fast] <= 0:
                    break

                slow = next_slow
                fast = next_fast

                if slow == fast:
                    if slow == next_index(slow):
                        break
                    return True

            val = nums[i]
            j = i
            while nums[j] * val > 0:
                next_j = next_index(j)
                nums[j] = 0
                j = next_j

        return False

def main():
    nums = [2, -1, 1, 2, 2]
    solution = Solution()
    result = solution.circularArrayLoop(nums)
    print("Cycle exists in circular array:", result)

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(1)

"""