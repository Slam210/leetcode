"""

We're given an integer n as a string. Our task is to find the smallest base k (≥2) such that 
n = 1 + k^1 + k^2 + ... + k^(m-1). In other words, the number n in base k is written as 111...1 . 
This is a mathematical problem involving geometric series. We need to try values of m from maximum 
down to 2. For each m, use binary search to find a valid k that satisfies the geometric sum equation. 
Return the smallest such base k.

"""

from typing import List
from math import log

class Solution:
    def smallestGoodBase(self, n: str) -> str:
        # Convert the input string to an integer
        num = int(n)

        # The maximum possible length of 1's in any base-k representation of num
        # is floor(log₂(num)) + 1, because the smallest base is 2
        max_m = int(log(num, 2)) + 1

        # Try all possible lengths m (number of 1's) from max_m down to 2
        for m in range(max_m, 1, -1):
            # Use binary search to find the base k in the range [2, num^(1/(m-1))]
            # k^0 + k^1 + ... + k^(m-1) = (k^m - 1) / (k - 1) ≤ num
            left, right = 2, int(num ** (1 / (m - 1))) + 1

            while left <= right:
                k = (left + right) // 2

                # Compute the sum: 1 + k + k^2 + ... + k^(m-1)
                total = 1
                curr = 1
                for _ in range(1, m):
                    curr *= k
                    total += curr

                if total == num:
                    # Found a valid base k where num is a sequence of m 1's in base k
                    return str(k)
                elif total < num:
                    # Need a larger base to reach num
                    left = k + 1
                else:
                    # Base is too large, reduce it
                    right = k - 1

        # If no smaller base is found, the answer is num - 1
        # because every number n can be written as "11" in base n-1
        return str(num - 1)

def main():
    sol = Solution()

    print("Input: 13")
    print("Output:", sol.smallestGoodBase("13")) 

    print("Input: 4681")
    print("Output:", sol.smallestGoodBase("4681"))  

    print("Input: 1000000000000000000")
    print("Output:", sol.smallestGoodBase("1000000000000000000"))  

if __name__ == "__main__":
    main()

"""

Time complexity is O(log²(n))
Space complexity is O(1)

"""