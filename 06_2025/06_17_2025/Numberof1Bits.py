"""

The intuition behind this problem is to realize that bit manipulation
will remove the least significant bit from the digit if we perform it between
n and n-1. Thus, we can loop until we reach 0, which will indicate how many one's there
are in n.

"""
class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            n = n & (n-1)
            count += 1
        return count
        
if __name__ == "__main__":
    solution = Solution()
    test_cases = [0,1,11,128,255,1023]
    
    for n in test_cases:
        print(f"Hamming weight of {n} (binary {bin(n)}): {solution.hammingWeight(n)}")
        
"""

The run time is O(n) where n is the number of 1 bits
Space complexity is O(1) since no other data structures are made

"""