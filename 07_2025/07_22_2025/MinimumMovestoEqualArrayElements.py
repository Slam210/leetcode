"""

We are given an array nums of size n. In one move, we can increment n - 1 elements by 1. 
Return the minimum number of moves required to make all elements equal. We can solve this by 
finding the minimum value and using that as a base to determine how many moves needed to make 
all values the same. We could also do max, using the process in reverse.

"""

from typing import List

class Solution:
    def minMoves(self, nums: List[int]) -> int:
        min_val = min(nums)

        moves = 0
        for num in nums:
            moves += num - min_val

        return moves

def main():
    nums = [1, 2, 3]
    solution = Solution()
    result = solution.minMoves(nums)
    print("Minimum number of moves to equalize array:", result)

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(1)

"""