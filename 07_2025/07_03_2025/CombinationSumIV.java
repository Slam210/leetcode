/**
 * 
 * We’re given an array nums of distinct positive integers and a target value.
 * We need to return the number of ordered combinations where elements from nums
 * sum to target. Order matters, so [1, 2] and [2, 1] are counted as two
 * different combinations. This is a Dynamic Programming problem, specifically,
 * a variation of the coin change problem where order matters.
 * 
 */

public class CombinationSumIV {
    static class Solution {
        public int combinationSum4(int[] nums, int target) {
            int[] dp = new int[target + 1];
            dp[0] = 1;

            for (int i = 1; i <= target; i++) {
                for (int num : nums) {
                    if (i - num >= 0) {
                        dp[i] += dp[i - num];
                    }
                }
            }

            return dp[target];
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = { 1, 2, 3 };
        int target = 4;
        System.out.println("Number of combinations: " + sol.combinationSum4(nums, target));
    }
}

/**
 * 
 * Run complexity is O(target * nums.length)
 * Space os O(target)
 * 
 */