/*
 * 
 * The intuition behind this problem is to loop through the list and track whether
 * or not the next number is exactly 1 above the previous. If it is we continue.
 * When we reach the end, we check if the start is equal to the end, and if it is
 * then we do not need to add the ->
 * 
 */

import java.util.*;

public class SummaryRanges {

    public static class Solution {
        public List<String> summaryRanges(int[] nums) {
            List<String> result = new ArrayList<>();
            int i = 0;
            while (i < nums.length) {
                int start = nums[i];
                while (i + 1 < nums.length && nums[i + 1] == nums[i] + 1) {
                    i++;
                }
                int end = nums[i];
                if (start == end) {
                    result.add(String.valueOf(start));
                } else {
                    result.add(start + "->" + end);
                }
                i++;
            }
            return result;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        int[] nums1 = {0, 1, 2, 4, 5, 7};
        int[] nums2 = {1, 3, 5, 7};

        System.out.println(sol.summaryRanges(nums1));
        System.out.println(sol.summaryRanges(nums2)); 
    }
}

/*
 * 
 * The time complexity is O(n) as each element is visited once.
 * Space complexity is O(k) for the output list
 */