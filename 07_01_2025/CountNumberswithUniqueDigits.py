"""

Given an integer n, return the count of all numbers with unique digits.
For every digit index, we have n-1, n-2, possible indexes as we increase.
Thus, we only need to multiply 10-i where i decreases for each availible.
index.

"""

class Solution:
    def countNumbersWithUniqueDigits(self, n: int) -> int:
        if n == 0:
            return 1
        
        total = 1 
        for k in range(1, n + 1):
            if k > 10:
                break 
            count = 9
            for i in range(1, k):
                count *= (10 - i)
            total += count
        return total

if __name__ == "__main__":
    solution = Solution()
    for n in range(0, 12):
        print(f"n = {n}, Unique Digit Count = {solution.countNumbersWithUniqueDigits(n)}")
        
"""

Time complexity is O(n)
Space complexity is O(1)

"""
