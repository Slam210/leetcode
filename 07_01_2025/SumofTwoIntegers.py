"""

Given 2 integers, return their sum without performing any addition or subtraction
operations. We can achieve this using bit manipulation. We simulate addition using binary logic
^ for sum and & << 1 for carry. Additionally, we can use the second integer as a placeholder for the
carry so we iterate until there is nothing left. We need to use a mask to similate the
32 bit integers and a max int to compare if we need to return the complement.

"""

class Solution:
    def getSum(self, a: int, b: int) -> int:
        MASK = 0xFFFFFFFF
        MAX_INT = 0x7FFFFFFF

        while b != 0:
            a, b = (a ^ b) & MASK, ((a & b) << 1) & MASK

        return a if a <= MAX_INT else ~(a ^ MASK)


if __name__ == "__main__":
    solution = Solution()
    test_cases = [
        (1, 2),      
        (-1, 1),     
        (-2, -3),    
        (123, 456),  
        (-5, 10),    
    ]
    for a, b in test_cases:
        print(f"getSum({a}, {b}) = {solution.getSum(a, b)}")

"""

Time complexity is O(1)
Space complexity is O(1)

"""