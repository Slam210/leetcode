"""

We realize the key is to manage character frequencies so no two identical characters end up adjacent. 
By always choosing the most frequent characters next, we minimize the chance of duplicates colliding. 
We can implement this with a max-heap: repeatedly pop the two highest-frequency characters, append
them to the result, reduce their counts, and push them back if they’re not exhausted. This greedy strategy 
ensures a valid arrangement whenever possible, otherwise we return an empty string.

"""

from typing import List
import heapq
from collections import Counter

class Solution:
    def reorganizeString(self, s: str) -> str:
        freq = Counter(s)
        n = len(s)
        
        if any(c > (n + 1) // 2 for c in freq.values()):
            return ""
        
        heap = [(-count, ch) for ch, count in freq.items()]
        heapq.heapify(heap)
        
        res = []
        while len(heap) >= 2:
            count1, ch1 = heapq.heappop(heap)
            count2, ch2 = heapq.heappop(heap)
            
            res.append(ch1)
            res.append(ch2)
            
            if count1 + 1 < 0:
                heapq.heappush(heap, (count1 + 1, ch1))
            if count2 + 1 < 0:
                heapq.heappush(heap, (count2 + 1, ch2))
        
        if heap:
            res.append(heap[0][1])
        
        return "".join(res)


def main():
    s = Solution()
    tests = ["aab", "aaab", "vvvlo", "aaabc"]
    for t in tests:
        print(f"s = {t} -> reorganized = '{s.reorganizeString(t)}'")

if __name__ == "__main__":
    main()

"""

Time complexity is O(nlog(k))
Space complexity is O(k)

"""