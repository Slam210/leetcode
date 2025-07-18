
/**
 * 
 * We are given an integer array nums of length 3 * n. We need to remove exactly n elements such 
 * that the remaining 2 * n elements, when split into two parts of n elements each, have the 
 * smallest possible difference between their sums. Since we're only allowed to remove a 
 * subsequence of exactly n elements, we cannot arbitrarily rearrange elements. To minimize 
 * sumFirst - sumSecond, we need sumFirst to be as small as possible and sumSecond to be as large
 *  as possible. However, we must choose n elements to remove such that the remaining elements 
 * are from nums in order. We take advantage of this by considering every possible split of nums 
 * into three parts. To achieve this we use a max heap to track the largest n elements from the 
 * left → minimize sumFirst and a min heap to track the smallest n elements from the right → 
 * maximize sumSecond.
 * 
 */

import java.util.Collections;
import java.util.PriorityQueue;

public class MinimumDifferenceinSumsAfterRemovalofElements {
    static class Solution {
        public long minimumDifference(int[] nums) {
            int n = nums.length / 3;
            long[] leftSums = new long[nums.length];
            long[] rightSums = new long[nums.length];

            PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
            long sumLeft = 0;
            for (int i = 0; i < 2 * n; i++) {
                sumLeft += nums[i];
                maxHeap.add(nums[i]);
                if (maxHeap.size() > n) {
                    sumLeft -= maxHeap.poll();
                }
                if (maxHeap.size() == n) {
                    leftSums[i] = sumLeft;
                }
            }

            PriorityQueue<Integer> minHeap = new PriorityQueue<>();
            long sumRight = 0;
            for (int i = nums.length - 1; i >= n; i--) {
                sumRight += nums[i];
                minHeap.add(nums[i]);
                if (minHeap.size() > n) {
                    sumRight -= minHeap.poll();
                }
                if (minHeap.size() == n) {
                    rightSums[i] = sumRight;
                }
            }

            long minDiff = Long.MAX_VALUE;
            for (int i = n - 1; i < 2 * n; i++) {
                minDiff = Math.min(minDiff, leftSums[i] - rightSums[i + 1]);
            }

            return minDiff;
        }

    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { 1, 3, 5, 2, 8, 7, 4, 6, 9 };
        long result = solution.minimumDifference(nums);
        System.out.println("Minimum difference: " + result);
    }
}

/**
 * 
 * Time complexity is O(n log(n))
 * Space complexity is O(n)
 * 
 */