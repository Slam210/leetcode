"""

The intuition behind this problem is to use bit shifting in order to
revese the original 32 bits. We can & n and 1 to get the last bit,
adding it to result. We then shift the result left one and n right one
bit each to get the next result. Repeat until all 32 are done

"""

class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for _ in range(32):
            res = (res << 1) | (n & 1)
            n >>= 1
        return res
    
if __name__ == "__main__":
    solution = Solution()
    test_cases = [
        0b00000010100101000001111010011100,
        0b11111111111111111111111111111101
    ]
    
    for n in test_cases:
        reversed_bits = solution.reverseBits(n)
        print(f"Original: {n:032b}")
        print(f"Reversed: {reversed_bits:032b}")
        print(f"Reversed int: {reversed_bits}")
        print()

"""

Run complexity is O(1) since we always run a fixed 32 operations
Space complexity is O(1) since we only create storage for the result

"""