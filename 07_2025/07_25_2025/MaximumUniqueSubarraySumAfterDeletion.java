import java.util.HashSet;
import java.util.Set;

public class MaximumUniqueSubarraySumAfterDeletion {

    static class Solution {
        public int maxSum(int[] nums) {
            boolean allNegative = true;
            int maxValue = Integer.MIN_VALUE;
            for (int n : nums) {
                if (n >= 0) {
                    allNegative = false;
                }
                if (n > maxValue) {
                    maxValue = n;
                }
            }
            if (allNegative)
                return maxValue;

            Set<Integer> unique = new HashSet<>();
            for (int n : nums) {
                unique.add(n);
            }

            int sum = 0;
            for (int val : unique) {
                if (val > 0) {
                    sum += val;
                }
            }

            return sum;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        int[] nums1 = { 4, 2, 4, 5, 6 };
        int[] nums2 = { 5, 2, 1, 2, 5, 2, 1, 2 };

        System.out.println("Maximum sum (example 1): " + sol.maxSum(nums1));
        System.out.println("Maximum sum (example 2): " + sol.maxSum(nums2));
    }
}
