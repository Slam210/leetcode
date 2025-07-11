
/**
 * 
 * Given an array nums and an integer k, split nums into k non-empty contiguous subarrays. 
 * The goal is to minimize the largest sum among these subarrays. This is a binary search on 
 * the answer problem. We want to minimize the maximum sum among subarrays. We know the 
 * smallest possible max sum is the max element in nums and that the largest possible max sum 
 * is the sum of all elements. We can binary search between these two boundaries to find the 
 * minimum possible largest sum such that we can split the array into k or fewer parts.
 * 
 */

import java.util.Arrays;

public class SplitArrayLargestSum {
    static class Solution {
        public int splitArray(int[] nums, int k) {
            int left = Arrays.stream(nums).max().getAsInt();
            int right = Arrays.stream(nums).sum();

            while (left < right) {
                int mid = left + (right - left) / 2;
                if (canSplit(nums, k, mid)) {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }

            return left;
        }

        private boolean canSplit(int[] nums, int k, int maxAllowedSum){
            int count = 1;
            int currentSum = 0;
            for (int num : nums) {
                if (currentSum + num > maxAllowedSum) {
                    count++;
                    currentSum = num;
                    if (count > k)
                        return false;
                } else {
                    currentSum += num;
                }
            }
            return true;
        }
    }

    public static void main(String[] args){
        Solution sol = new Solution();

        int[] nums1 = {7, 2, 5, 10, 8};
        int k1 = 2;
        System.out.println("Output 1: " + sol.splitArray(nums1, k1));

        int[] nums2 = { 1, 2, 3, 4, 5 };
        int k2 = 2;
        System.out.println("Output 2: " + sol.splitArray(nums2, k2));
    }
}

/**
 * 
 * Time complexity is O(n *log(sum - max))
 * Space comeplexity is O(1)
 * 
 */