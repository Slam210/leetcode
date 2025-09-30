"""

We recognize that to maximize chunks, we should cut the array whenever the largest element seen so far is no greater 
than the smallest element of the remaining suffix. This ensures that sorting each part independently and concatenating 
them preserves global order. By precomputing prefix maximums and suffix minimums, we can efficiently check where valid 
cuts exist and count them.

"""

from typing import List

class Solution:
    def maxChunksToSorted(self, arr: List[int]) -> int:
        n = len(arr)
        if n == 0:
            return 0

        # prefix maximum
        left_max = [0] * n
        left_max[0] = arr[0]
        for i in range(1, n):
            left_max[i] = max(left_max[i-1], arr[i])

        # suffix minimum
        right_min = [0] * n
        right_min[-1] = arr[-1]
        for i in range(n-2, -1, -1):
            right_min[i] = min(right_min[i+1], arr[i])

        # count valid partitions
        chunks = 0
        for i in range(n-1):
            if left_max[i] <= right_min[i+1]:
                chunks += 1

        return chunks + 1


def main():
    s = Solution()
    tests = [
        [5,4,3,2,1],      
        [2,1,3,4,4],     
        [1,0,2,3,4],      
        [1,2,0,3],       
    ]
    for arr in tests:
        print(f"arr = {arr} -> max chunks = {s.maxChunksToSorted(arr)}")

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(n)

"""