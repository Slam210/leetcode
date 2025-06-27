/**
 * 
 * We are given a sorted array nums and need to make sure we can represent every
 * number in the range [1, n] using the sum of some subset of nums, possibly
 * after inserting some new elements (patches). The goal is to use the fewest
 * number of patches. The greedy idea is keep track of the smallest number we
 * can’t currently form, called miss. If nums[i] <= miss, then we can extend the
 * range of representable numbers by including nums[i], so we do miss +=
 * nums[i]. If nums[i] > miss, then we can’t reach miss, so we need to patch in
 * the number miss itself, which doubles the range of numbers we can reach (from
 * [1, miss) to [1, 2 * miss)). Repeat until miss > n.
 * 
 */

public class PatchingArray {
    static class Solution {
        public int minPatches(int[] nums, int n) {
            long miss = 1;
            int patches = 0, i = 0;
            while (miss <= n) {
                if (i < nums.length && nums[i] <= miss) {
                    miss += nums[i++];
                } else {
                    miss += miss;
                    patches++;
                }
            }
            return patches;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = { 1, 3 };
        int n = 6;
        int result = sol.minPatches(nums, n);
        System.out.println("Minimum patches needed: " + result);
    }
}

/*
 * 
 * Run time is O(nums.length + log(n))
 * Space complexity is O(1)
 * 
 */