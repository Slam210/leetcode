'''

We treat the problem as maintaining a window that represents a valid subarray product. 
As we slide the right pointer through the array, we update the running product. 
If the product ever exceeds or equals k, we shrink from the left until it’s valid again. 
At each step, the number of valid subarrays ending at the current index is simply the window 
length, and summing these across all indices gives the result.

'''

from typing import List

class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0
        
        product = 1
        left = 0
        count = 0
        
        for right in range(len(nums)):
            product *= nums[right]
            
            while product >= k and left <= right:
                product //= nums[left]
                left += 1
                
            count += (right - left + 1)
        
        return count

def main():
    sol = Solution()
    print(sol.numSubarrayProductLessThanK([10, 5, 2, 6], 100)) 
    print(sol.numSubarrayProductLessThanK([1, 2, 3], 0))

if __name__ == "__main__":
    main()
        
'''

Time complexity is O(n)
Space complexity is O(1)

'''