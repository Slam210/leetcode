"""

Given an integer a, and an array representing a number, b, return a^b % 1337.
We can join b into an int and return the power of a^i module 1337.

"""

from typing import List

class Solution:
    def superPow(self, a: int, b: List[int]) -> int:
        if a==1:
            return 1
        i=int(''.join([str(j) for j in b]))
        return pow(a,i,1337)


if __name__ == "__main__":
    solution = Solution()
    print(solution.superPow(2, [1, 0]))     
    print(solution.superPow(2, [3]))        
    print(solution.superPow(2, [1, 0, 0]))

"""

Time comlpexity O(b) since we iterate through it
Space complexity is O(1)

"""