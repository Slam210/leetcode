"""

We're given four integer arrays: nums1, nums2, nums3, and nums4, each of length n. We need to 
count how many tuples (i, j, k, l) satisfy nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0. A 
brute-force solution would check all combinations of elements, which takes O(n^4) time and this 
is too slow. Instead, we can split the problem into two parts. Compute all possible sums of pairs 
from nums1 and nums2, and store their frequencies in a hashmap. Then for each pair in nums3 and 
nums4, compute their sum and check if the negative of that sum exists in the hashmap.

"""

from typing import List
from collections import Counter

class Solution:
    def fourSumCount(self, nums1: List[int], nums2: List[int], nums3: List[int], nums4: List[int]) -> int:
        sum_map = Counter()
        for a in nums1:
            for b in nums2:
                sum_map[a + b] += 1

        count = 0
        for c in nums3:
            for d in nums4:
                target = -(c + d)
                if target in sum_map:
                    count += sum_map[target]

        return count

def main():
    nums1 = [1, 2]
    nums2 = [-2, -1]
    nums3 = [-1, 2]
    nums4 = [0, 2]
    
    solution = Solution()
    result = solution.fourSumCount(nums1, nums2, nums3, nums4)
    print("Number of tuples that sum to 0:", result)

if __name__ == "__main__":
    main()

"""

Time complexity is O(n^2)
Space complexity is O(1)

"""