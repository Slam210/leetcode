"""

We're receiving a stream of numbers and must maintain a summary of disjoint 
intervals that merge consecutive values. Use a balanced tree or just a sorted 
list of intervals. We’ll use balanced tree for performance and simplicity. 
Each interval is [start, end], and the list is always sorted by start.

"""

from bisect import bisect_left
from typing import List

class SummaryRanges:

    def __init__(self):
        self.intervals = []

    def addNum(self, value: int) -> None:
        intervals = self.intervals
        n = len(intervals)

        # Binary search: Find position to insert
        i = bisect_left(intervals, [value, value])

        # Check left merge possibility
        left_merge = (i > 0 and intervals[i-1][1] + 1 >= value)
        # Check right merge possibility
        right_merge = (i < n and intervals[i][0] - 1 <= value)

        if left_merge and right_merge:
            # Merge both left and right
            intervals[i-1][1] = max(intervals[i-1][1], intervals[i][1], value)
            intervals[i-1][0] = min(intervals[i-1][0], intervals[i][0], value)
            intervals.pop(i)
        elif left_merge:
            intervals[i-1][1] = max(intervals[i-1][1], value)
        elif right_merge:
            intervals[i][0] = min(intervals[i][0], value)
        else:
            # Insert new disjoint interval
            intervals.insert(i, [value, value])

    def getIntervals(self) -> List[List[int]]:
        return self.intervals
        
# Your SummaryRanges object will be instantiated and called as such:
# obj = SummaryRanges()
# obj.addNum(value)
# param_2 = obj.getIntervals()

"""

addNum requires O(n) space and time complexity
getIntervals is O(1) or a shallow interval or O(n) for a copy

"""