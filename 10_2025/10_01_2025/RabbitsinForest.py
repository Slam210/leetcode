"""

We need to find the smallest forest size consistent with all rabbit answers. 
Since an answer k implies a color group of size k + 1, multiple rabbits giving 
the same answer can be grouped together, but only up to k + 1 per group. If more 
than k + 1 rabbits say k, then new groups are needed. Thus, for each unique answer k, 
we compute how many groups of size k + 1 are required, then add them all up.

"""

from typing import List
from collections import Counter

class Solution:
    def numRabbits(self, answers: List[int]) -> int:
        freq = Counter(answers)
        total = 0
        
        for k, count in freq.items():
            group_size = k + 1
            groups = (count + group_size - 1) // group_size 
            total += groups * group_size
        
        return total


def run_tests():
    sol = Solution()
    tests = [
        ([1, 1, 2], 5),    
        ([10, 10, 10], 11),
        ([], 0),           
        ([0, 0, 1, 1, 1], 6),
    ]
    
    for arr, expected in tests:
        result = sol.numRabbits(arr)
        print(f"answers={arr} -> {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()

"""

Time complexity is O(n)
Space complexity is O(n)

"""