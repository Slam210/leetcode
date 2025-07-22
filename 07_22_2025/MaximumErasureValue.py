"""

We're given an array nums of positive integers. We want to erase one subarray such that all 
elements in the subarray are unique. The score for the subarray is the sum of its elements. 
We need to return the maximum score you can get by erasing exactly one such subarray. This 
is essentially a maximum sum of a sliding window with all unique elements problem.

"""

from typing import List

class Solution:
    def maximumUniqueSubarray(self, nums: List[int]) -> int:
        seen = set()
        left = 0
        curr_sum = 0
        max_score = 0

        for right in range(len(nums)):
            while nums[right] in seen:
                seen.remove(nums[left])
                curr_sum -= nums[left]
                left += 1
            seen.add(nums[right])
            curr_sum += nums[right]
            max_score = max(max_score, curr_sum)

        return max_score

def main():
    nums = [4, 2, 4, 5, 6]

    solution = Solution()
    result = solution.maximumUniqueSubarray(nums)

    print("Maximum score of a unique subarray:", result)

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(n)

"""