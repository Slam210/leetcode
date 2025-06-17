"""

The intuition behind this is to realize it is a custom sorting problem.
To decide the order between two numbers x and y, compare:  "xy" vs "yx" 
(as strings) If "xy" > "yx", then x should come before y. From there we can
combine the sorted result which will give us the Largest number.

"""

from typing import List
from functools import cmp_to_key

class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        def compare(x: str, y :str) -> int:
            if x + y > y + x:
                return -1
            elif x + y < y + x:
                return 1
            else:
                return 0
        nums = list(map(str, nums))
        nums.sort(key=cmp_to_key(compare))
        res = ''.join(nums)
        return '0' if res[0] == '0' else res

if __name__ == "__main__":
    solution = Solution()
    test_cases = [
        [3, 30, 34, 5, 9],
    ]
    
    for nums in test_cases:
        print(f"Largest number from {nums} → {solution.largestNumber(nums)}")

"""

Due to the sorting, run time is O(n log(n))
Space complexity is O(n)

"""