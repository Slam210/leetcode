/**
 * 
 * We want the longest subsequence where differences strictly alternate between
 * positive and negative. A subsequence allows skipping elements. We don't need
 * to actually form the sequence, just return its length. We want to detect a
 * change in direction which are Up when current > previous and Down when
 * current < previous. Whenever we detect such a change, we can add 1 to the
 * length of the wiggle subsequence.
 * 
 */

public class WiggleSubsequence {
    static class Solution {
        public int wiggleMaxLength(int[] nums) {
            if (nums.length < 2)
                return nums.length;

            int up = 0;
            int down = 0;

            for (int i = 1; i < nums.length; i++) {
                if (nums[i] > nums[i - 1]) {
                    up = down + 1;
                } else if (nums[i] < nums[i - 1]) {
                    down = up + 1;
                }
            }

            return Math.max(up, down) + 1;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = { 1, 7, 4, 9, 2, 5 };
        System.out.println("Length of longest wiggle subsequence: " + sol.wiggleMaxLength(nums));
    }

}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is O(1)
 * 
 */