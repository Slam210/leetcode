"""

The problem asks us to find all indexes where the value minus the key index 
is less than or equal to k. To solve this, we can use loop to find the indexes
of each key. From there, we can create a set that loops through each k index, adding 
it to the result set if the dfference is within the range.

"""

from typing import List

class Solution:
    def findKDistantIndices(self, nums: List[int], key: int, k: int) -> List[int]:
        key_indices = []
        for j in range(len((nums))):
            if nums[j] == key:
                key_indices.append(j)
        result_set = set()
        for j in key_indices:
            for i in range(max(0, j-k), min(len(nums), j + k + 1)):
                result_set.add(i)
        result = sorted(result_set)
        return result

if __name__ == "__main__":
    sol = Solution()
    nums = [3, 4, 9, 1, 3, 9, 5]
    key = 9
    k = 1
    print(sol.findKDistantIndices(nums, key, k))

"""

Run complexity is O(nk + nlog(n))
Space complexity is O(n)

"""