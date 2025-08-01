
/**
 * 
 * We are given an array nums. We need to count the number of arithmetic subsequences of length 
 * at least 3. An arithmetic subsequence has at least 3 elements and constant difference between 
 * consecutive elements. For every pair of indices (j, i) where j < i, we can compute the 
 * difference diff = nums[i] - nums[j], use dp[i][diff] to track how many subsequences ending at 
 * i with common difference diff. For each pair dp[i][diff] += dp[j][diff] + 1. We sum up all 
 * dp[j][diff] used to extend into sequences of length >= 3.
 * 
 */

import java.util.*;

public class ArithmeticSlicesIISubsequence {
    class Solution {
        public int numberOfArithmeticSlices(int[] nums) {
            int n = nums.length;
            @SuppressWarnings("unchecked")
            Map<Long, Integer>[] dp = new HashMap[n];
            for (int i = 0; i < n; i++) {
                dp[i] = new HashMap<>();
            }

            int result = 0;

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < i; j++) {
                    long diff = (long) nums[i] - nums[j];
                    int countAtJ = dp[j].getOrDefault(diff, 0);
                    int countAtI = dp[i].getOrDefault(diff, 0);

                    dp[i].put(diff, countAtI + countAtJ + 1);

                    result += countAtJ;
                }
            }

            return result;
        }
    }

    public static void main(String[] args) {
        ArithmeticSlicesIISubsequence outer = new ArithmeticSlicesIISubsequence();
        Solution solution = outer.new Solution();

        int[] nums1 = { 2, 4, 6, 8, 10 };
        int[] nums2 = { 7, 7, 7, 7, 7 };

        System.out.println("Output 1: " + solution.numberOfArithmeticSlices(nums1)); // 7
        System.out.println("Output 2: " + solution.numberOfArithmeticSlices(nums2)); // 16
    }
}

/**
 * 
 * Time complexity is O(n^2)
 * Space complexity is O(n * d)
 * 
 */