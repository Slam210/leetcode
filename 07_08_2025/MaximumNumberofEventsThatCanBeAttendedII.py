"""

We are given a list of events where each event has a start and end date. We are also given
an integer k, representing the maximum amount of events we can attend. Each event also has 
a value associated with it. Our goal is to maximize the total value of events we can attend.
If we know each event has a start and end time with a value associated to it, this problem becomes
a variation of the weighted interval scheduling problem with the twist that we are allowed to
choose at most k jobs. To solve this, we can sort the events by end time, use a binary search
to find the last event that ends before the next one starts, and dynammic programming with
memoiation to avoid recomputation. 

"""

from typing import List
import bisect

class Solution:
    def maxValue(self, events: List[List[int]], k: int) -> int:
        n = len(events)
        events.sort()
        
        memo = [[-1] * (k + 1) for _ in range(n)]
        
        def dp(index: int, remaining: int) -> int:
            if index == n or remaining == 0:
                return 0
            if memo[index][remaining] != -1:
                return memo[index][remaining]
            max_val = dp(index + 1, remaining)
            start, end, value = events[index]
            next_index = bisect.bisect_right(events, end, key=lambda e: e[0])
            max_val = max(max_val, value + dp(next_index, remaining - 1))
            memo[index][remaining] = max_val
            return max_val
        
        return dp(0,k)
    
def main():
    events = [
        [1, 3, 4],
        [2, 5, 3],
        [4, 6, 7],
        [7, 8, 2]
    ]
    k = 2

    sol = Solution()
    result = sol.maxValue(events, k)
    print("Maximum value by attending up to", k, "events:", result)

if __name__ == "__main__":
    main()
        
"""

Time compleixty is O(n * k * log(n)) where n * k is the dp states and each search us O(log(n))
Space complexity is O(n) for binary search list and call stack

"""