"""

We start by fixing a pair of columns left and right. For each row, compute the 
prefix sum between those columns which forms a 1D array representing the sum of the 
rectangle from left to right. Then, use a prefix sum + TreeSet/SortedList method to 
find the max subarray sum no more than k.

"""

from sortedcontainers import SortedList
from typing import List

class Solution:
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        if not matrix or not matrix[0]:
            return 0
        
        max_result = float('-inf')
        rows, cols = len(matrix), len(matrix[0])
        
        for left in range(cols):
            row_sums = [0] * rows
            for right in range(left, cols):
                for r in range(rows):
                    row_sums[r] += matrix[r][right]
                
                prefix_sum = 0
                prefix_sums = SortedList([0])
                for sum_ in row_sums:
                    prefix_sum += sum_
                    idx = prefix_sums.bisect_left(prefix_sum - k)
                    if idx < len(prefix_sums):
                        max_result = max(max_result, prefix_sum - prefix_sums[idx])
                    prefix_sums.add(prefix_sum)
                    
        return max_result

"""

Time complexity is O(n^2 * m * log9m)
Space complexity is O(m)

"""