"""

We start by sorting the envelopes with a primary sort by width in ascending order.
We perform a secondary sort by height in descending order This ensures we don't 
accidentally count envelopes of the same width multiple times. After sorting, 
extract only the heights and find the LIS on the heights because the widths
are already strictly increasing.


"""

from bisect import bisect_left
from typing import List

class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        envelopes.sort(key=lambda x: (x[0], -x[1]))
        
        heights = [h for _, h in envelopes]
        
        dp = []
        for h in heights:
            idx = bisect_left(dp, h)
            if idx == len(dp):
                dp.append(h)
            else:
                dp[idx] = h
        
        return len(dp)
    
def main():
    solution = Solution()

    test_cases = [
        ([[5,4],[6,4],[6,7],[2,3]], 3),
        ([[1,1],[1,1],[1,1]], 1),
    ]

    for i, (envelopes, expected) in enumerate(test_cases):
        result = solution.maxEnvelopes(envelopes)
        print(f"Test Case {i+1}: Expected {expected}, Got {result}")

"""

Run time is O(n log(n))
Space time is O(n)

"""