
/**
 * 
 * We are given an array nums of size n where each number is in the range [1, n]. Each number 
 * appears at most twice. We need to return a list of all numbers that appear exactly twice and 
 * use O(n) time and O(1) auxiliary space (excluding output list). Since numbers are in the range 
 * [1, n], we can use the input array nums itself to mark visited numbers.  For each num in nums, 
 * the index abs(num) - 1 is a valid index (0-based). We can mark that we've seen a number by 
 * negating the value at that index. If the value at index abs(num) - 1 is positive, mark it as 
 * visited by negating it. If the value is already negative, we've seen this number before → it’s 
 * a duplicate.
 * 
 */

import java.util.ArrayList;
import java.util.List;

public class FindAllDuplicatesinanArray {
    static class Solution {
        public List<Integer> findDuplicates(int[] nums) {
            List<Integer> res = new ArrayList<>();

            for (int i = 0; i < nums.length; i++) {
                int val = Math.abs(nums[i]);
                if (nums[val - 1] < 0) {
                    res.add(val);
                } else {
                    nums[val - 1] = -nums[val - 1];
                }
            }

            return res;
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = { 4, 3, 2, 7, 8, 2, 3, 1 };
        List<Integer> duplicates = solution.findDuplicates(nums);
        System.out.println("Duplicates: " + duplicates);
    }
}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is O(1)
 * 
 */