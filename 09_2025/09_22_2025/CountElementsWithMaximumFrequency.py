from collections import Counter
from typing import List


class Solution:
    def maxFrequencyElements(self, nums: List[int]) -> int:
        if not nums:
            return 0
        counts = Counter(nums)
        max_freq = max(counts.values())
        total = sum(freq for freq in counts.values() if freq == max_freq)
        return total
        
def main():
    sol = Solution()
    
    tests = [
        ([1, 1, 2, 2, 3], 4),
        ([1, 2, 3], 3),
        ([1, 1, 1], 3),
        ([], 0),
        ([5, 5, 5, 2, 2, 2, 3], 6), ]
    
    for nums, expected in tests:
        result = sol.maxFrequencyElements(nums)
        print(f"nums = {nums}\n -> result = {result} expected = {expected}\n")
        
if __name__ == "__main__":
    main()