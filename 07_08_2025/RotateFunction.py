"""

Given an array nums, we define a rotation function F(k) that calculates the weighted sum after 
rotating the array clockwise by k positions. We need to compute F(k) for all k in [0, n-1] 
and return the maximum value. Calculating F(k) directly for each rotation would cost O(n²) time, 
which is too slow for large arrays. Instead, we look for a pattern between F(k) and F(k-1) to 
derive a recurrence relation that allows us to compute each F(k) in O(1) time after F(0).

"""

from typing import List

class Solution:
    def maxRotateFunction(self, nums: List[int]) -> int:
        n = len(nums)
        total_sum = sum(nums)
        
        f = sum(i * num for i, num in enumerate(nums))
        max_f = f
        
        for k in range(1, n):
            f = f + total_sum - n * nums[n - k]
            max_f = max(max_f, f)
        
        return max_f

def main():
    sol = Solution() 
    test_cases = [
        [4, 3, 2, 6],      
        [1, 2, 3, 4, 5],   
        [100],            
        [-1, -2, -3],   
    ]
    
    for nums in test_cases:
        print(f"Input: {nums} → Output: {sol.maxRotateFunction(nums)}")

if __name__ == "__main__":
    main()
    
"""

Run complexity is O(n)
Space complexity is O(1)

"""