/**
 * 
 * Given an integer array nums, return the number of arithmetic subarrays of
 * length at least 3, where the difference between consecutive elements is
 * constant. We’re looking for contiguous subarrays where length ≥ 3 and
 * consecutive differences are equal. If a slice [a, b, c] is arithmetic, and
 * the next element d continues the same difference, then [a, b, c, d] is also
 * arithmetic. So we can extend known slices and count how many new valid slices
 * each element adds.
 * 
 */

public class ArithmeticSlices {
    static class Solution {
        public int numberOfArithmeticSlices(int[] nums) {
            int count = 0;
            int current = 0;

            for (int i = 2; i < nums.length; i++) {
                if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) {
                    current += 1;
                    count += current;
                } else {
                    current = 0;
                }
            }

            return count;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        int[] nums1 = { 1, 2, 3, 4 };
        System.out.println("Arithmetic slices (1): " + sol.numberOfArithmeticSlices(nums1)); 

        int[] nums2 = { 1 };
        System.out.println("Arithmetic slices (2): " + sol.numberOfArithmeticSlices(nums2)); 

        int[] nums3 = { 1, 3, 5, 7, 9 };
        System.out.println("Arithmetic slices (3): " + sol.numberOfArithmeticSlices(nums3));
    }
}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is O(1)
 * 
 */