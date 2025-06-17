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