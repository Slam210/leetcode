"""

Given an array nums, for each index i, find the length of the shortest subarray starting at i 
such that the bitwise OR of the subarray is the maximum possible starting from i. We must return 
a list answer where each answer[i] is this minimum length. The bitwise OR of a subarray grows 
or stays the same as the subarray gets longer. The goal is to start at index i, and look as far 
as needed to reach the maximum OR obtainable from index i onward. But rather than recomputing 
the OR for every subarray, we can process from the end to the start, maintaining which bits are 
still relevant.

"""

from typing import List

class Solution:
    def smallestSubarrays(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [0] * n
        lastSeen = [-1] * 32

        for i in range(n - 1, -1, -1):
            for b in range(32):
                if nums[i] & (1 << b):
                    lastSeen[b] = i
            farthest = i
            for b in range(32):
                if lastSeen[b] != -1:
                    farthest = max(farthest, lastSeen[b])
            answer[i] = farthest - i + 1

        return answer


def main():
    solution = Solution()
    
    nums1 = [1, 0, 2, 1, 3]
    print("Input:", nums1)
    print("Output:", solution.smallestSubarrays(nums1)) 

    nums2 = [1, 2]
    print("Input:", nums2)
    print("Output:", solution.smallestSubarrays(nums2))  

    nums3 = [0, 0, 0]
    print("Input:", nums3)
    print("Output:", solution.smallestSubarrays(nums3))  

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(n) for redult array

"""